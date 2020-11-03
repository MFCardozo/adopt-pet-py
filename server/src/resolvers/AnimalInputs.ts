import { Field, InputType } from "type-graphql";

@InputType()
export class AnimalInputs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  size: string;

  @Field()
  type: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  age?: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  vaccionations?: boolean;

  @Field({ nullable: true })
  neutered?: boolean;

  @Field()
  location: string;
}
