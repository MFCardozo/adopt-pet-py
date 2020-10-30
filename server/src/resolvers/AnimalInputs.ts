import { GraphQLUpload, FileUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";

@InputType()
export class AnimalInputs {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // solve this fuck shit
  // @Field(() => GraphQLUpload)
  // images: FileUpload;

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
