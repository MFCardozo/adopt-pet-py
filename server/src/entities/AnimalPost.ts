import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Animal extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  description?: string;

  @Field(() => [String])
  @Column("text", { array: true })
  images!: string[];

  @Field()
  @Column()
  size!: string;

  @Field()
  @Column()
  type!: string;

  @Field()
  @Column()
  gender!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  age?: string;

  @Field()
  @Column("text")
  phone!: string;

  @Field()
  @Column({ default: false, nullable: true })
  vaccionations!: boolean;

  @Field()
  @Column({ default: false, nullable: true })
  neutered!: boolean;

  @Field()
  @Column("text")
  location!: string;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => User, (user) => user.posts)
  creator: User;

  @Field()
  @CreateDateColumn()
  createdDate: Date;

  @Field()
  @UpdateDateColumn()
  updatedDate: Date;
}
