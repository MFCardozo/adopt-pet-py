import { GraphQLUpload, FileUpload } from "graphql-upload";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";

import { Animal } from "../entities/AnimalPost";
import { userIsAuth } from "../middleware/UserIsAuth";
import { s3Uploader } from "../s3Uploader";
import { MyContext } from "../types/typesContext";
import { validateAnimalPost } from "../utils/validateAnimalPost";
import { AnimalInputs } from "./AnimalInputs";
import { FieldError } from "./FieldError";

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
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null,
    @Arg("type", () => String, { nullable: true }) type: string | null
  ): Promise<PaginatedAnimalsPosts> {
    // not more than 50 limit
    const realLimit = Math.min(50, limit);
    const reaLimitPlusOne = realLimit + 1;

    const replacements: any[] = [reaLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(cursor));
    }
    if (type) {
      replacements.push(type);
    }

    let animalPost = await getConnection().query(
      `
    select a.*
    from animal a
    ${
      cursor && !type
        ? `where a."createdDate" < $2`
        : !cursor && type
        ? `where a.type = $2`
        : cursor && type
        ? `where a."createdDate" < $2 and a.type=$3`
        : ""
    }
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
    images: Promise<FileUpload>,
    @Ctx()
    { req }: MyContext
  ): Promise<AnimalResponse> {
    //the apollo client already handle the image props in case or null

    const errors = validateAnimalPost(props);

    if (errors) {
      return { errors };
    }

    const { name } = props;
    let imagesUploaded = [];

    const { createReadStream, filename } = await images;
    const uniqueImgName = `${req.session.userId}-${name}-${filename}`;

    const filePath = s3Uploader.createDestinationFilePath(uniqueImgName);

    // Create an upload stream that goes to S3
    const uploadStream = s3Uploader.createUploadStream(filePath);
    // Pipe the file data into the upload stream
    //  if (!stream) {
    //    return null;
    //  }

    createReadStream().pipe(uploadStream.writeStream);

    // Start the stream
    const resultLink = await uploadStream.promise;

    const link = resultLink.Location;

    console.log("s3 bucket: ", link);

    imagesUploaded.push(link);

    const animal = await Animal.create({
      images: imagesUploaded,
      creatorId: req.session.userId,
      ...props,
    }).save();

    return { animal };
  }

  @Mutation(() => Animal, { nullable: true })
  @UseMiddleware(userIsAuth)
  async updateAnimal(
    @Arg("id") id: number,
    @Arg("props", () => AnimalInputs, { nullable: true }) props: AnimalInputs,
    @Arg("images", () => GraphQLUpload)
    images: Promise<FileUpload>,
    @Ctx() { req }: MyContext
  ): Promise<Animal | null> {
    const { name } = props;

    let imagesUpdated = [];
    const { createReadStream, filename } = await images;

    const uniqueImgName = `${req.session.userId}-${name}-${filename}`;
    const filePath = s3Uploader.createDestinationFilePath(uniqueImgName);

    // Create an upload stream that goes to S3
    const uploadStream = s3Uploader.createUploadStream(filePath);
    // Pipe the file data into the upload stream

    createReadStream().pipe(uploadStream.writeStream);

    // Start the stream
    const resultLink = await uploadStream.promise;

    const link = resultLink.Location;

    imagesUpdated.push(link);

    const result = await getConnection()
      .createQueryBuilder()
      .update(Animal)
      .set({
        images: imagesUpdated,
        ...props,
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
