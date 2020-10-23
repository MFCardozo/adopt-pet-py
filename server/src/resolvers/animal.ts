import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Animal } from "../entities/Animal";
import { AnimalInputs } from "./AnimalInputs";

@Resolver(Animal)
export class AnimalResolver {
  @Query(() => [Animal])
  async animals(): Promise<Animal[]> {
    return Animal.find();
  }

  @Query(() => Animal, { nullable: true })
  async animal(@Arg("id", () => Int) id: number): Promise<Animal | undefined> {
    return Animal.findOne({ id });
  }

  @Mutation(() => Animal)
  async addAnimal(@Arg("props") props: AnimalInputs): Promise<Animal> {
    const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(Animal)
      .values({
        ...props,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Animal, { nullable: true })
  async updateAnimal(
    @Arg("id") id: number,
    @Arg("props", () => AnimalInputs, { nullable: true }) props: AnimalInputs
  ): Promise<Animal | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Animal)
      .set({
        ...props,
      })
      .where("id=:id", { id })
      .returning("*")
      .execute();

    return result.raw[0];
  }

  @Mutation(() => Boolean, { nullable: true })
  async deleteAnimal(@Arg("id", () => Int) id: number): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Animal)
      .where("id = :id", { id })
      .execute();

    if (result.affected) {
      return true;
    }
    return false;
  }
}
