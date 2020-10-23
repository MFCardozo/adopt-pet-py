import { Field, InputType } from "type-graphql";

@InputType()
export class UserInputs {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
