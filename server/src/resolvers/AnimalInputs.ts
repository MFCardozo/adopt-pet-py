import { Field, InputType, Int } from "type-graphql";

@InputType()
export class AnimalInputs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  images: string[];

  @Field()
  size: string;

  @Field()
  type: string;

  @Field()
  gender: string;

  @Field(() => Int, { nullable: true })
  age?: number;

  @Field()
  phone: string;

  @Field({ nullable: true })
  vaccionations?: boolean;

  @Field({ nullable: true })
  neutered?: boolean;

  @Field()
  location: string;
}
