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
import { MyContext } from "../typesContext";
import { AnimalInputs } from "./AnimalInputs";
import { validateAnimalPost } from "../utils/validateAnimalPost";

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
    @Ctx() { req }: MyContext
  ): Promise<AnimalResponse> {
    const errors = validateAnimalPost(props);

    if (errors) {
      return { errors };
    }
    const animal = await Animal.create({
      ...props,
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
    const result = await getConnection()
      .createQueryBuilder()
      .update(Animal)
      .set({
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
