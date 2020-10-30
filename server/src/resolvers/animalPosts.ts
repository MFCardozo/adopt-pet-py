import {
  Arg,
  Ctx,
  Field,
  Int,
  ObjectType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";

import { getConnection } from "typeorm";
import { Animal } from "../entities/AnimalPost";

import { FieldError } from "./FieldError";
import { userIsAuth } from "../middleware/UserIsAuth";
import { MyContext } from "../types/typesContext";
import { AnimalInputs } from "./AnimalInputs";
import { validateAnimalPost } from "../utils/validateAnimalPost";
import { createWriteStream } from "fs";

import { FileUpload, GraphQLUpload } from "graphql-upload";

@ObjectType()
class PaginatedAnimalsPosts {
  @Field(() => [Animal])
  animalPost: Animal[];
  @Field()
  hasMore: boolean;
}
@ObjectType()
class AnimalResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Animal, { nullable: true })
  animal?: Animal;
}

@Resolver(Animal)
export class AnimalResolver {
  @Query(() => PaginatedAnimalsPosts)
  async animalPosts(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedAnimalsPosts> {
    // not more than 50 limit
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    const animalPost = await getConnection().query(
      `
    select a.*
    from animal a
    ${cursor ? `where a."createdDate" < $2` : ""}
    order by a."createdDate" DESC
    limit $1
    `,
      replacements
    );
    return {
      animalPost: animalPost.slice(0, realLimit),
      hasMore: animalPost.length === reaLimitPlusOne,
    };
  }

  @Query(() => Animal, { nullable: true })
  async animal(@Arg("id", () => Int) id: number): Promise<Animal | undefined> {
    return Animal.findOne({ id });
  }

  @Mutation(() => AnimalResponse)
  @UseMiddleware(userIsAuth)
  async addAnimal(
    @Arg("props") props: AnimalInputs,
    @Arg("images", () => GraphQLUpload)
    images: FileUpload,
    @Ctx()
    { req }: MyContext
  ): Promise<AnimalResponse> {

    //the apollo client already handle the image props i case or null
    const errors = validateAnimalPost(props);

    if (errors) {
      return { errors };
    }

    const {
      name,
      type,
      neutered,
      location,
      gender,
      phone,
      size,
      age,
      description,
      vaccionations,
    } = props;
    let imagesUploaded = [];
    
    const { createReadStream, filename } = await images;

    const uniqueImgName = `${req.session.userId}-${name}-${filename}`;
    await new Promise((res) =>
      createReadStream().pipe(
        createWriteStream(
          __dirname + `/../../../client/public/public-images/${uniqueImgName}`
        ).on("close", res)
      )
    );

    imagesUploaded.push(uniqueImgName);

    console.log("in database", imagesUploaded);

    const animal = await Animal.create({
      name,
      type,
      neutered,
      location,
      gender,
      phone,
      size,
      age,
      description,
      vaccionations,
      images: imagesUploaded,
      creatorId: req.session.userId,
    }).save();

    return { animal };
  }

  @Mutation(() => Animal, { nullable: true })
  @UseMiddleware(userIsAuth)
  async updateAnimal(
    @Arg("id") id: number,
    @Arg("props", () => AnimalInputs, { nullable: true }) props: AnimalInputs,
    @Ctx() { req }: MyContext
  ): Promise<Animal | null> {
    // TODO: INCLUDE THE IMAGE FIELD
    const {
      name,
      type,
      neutered,
      location,
      gender,
      phone,
      size,
      age,
      description,
      vaccionations,
    } = props;
    const result = await getConnection()
      .createQueryBuilder()
      .update(Animal)
      .set({
        name,
        type,
        neutered,
        location,
        gender,
        phone,
        size,
        age,
        description,
        vaccionations,
      })
      .where("id= :id and creatorId= :creatorId", {
        id,
        creatorId: req.session.userId,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseMiddleware(userIsAuth)
  async deleteAnimal(
    @Arg("id", () => Int) id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Animal.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
