import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Thread } from "./Thread";

@ObjectType()
@Entity()
export class Post {
// ! - CANNOT BE NULL
// ? - OPTIONAL
@Field(()=> Int)
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property({type: 'date'})
  createdAt = new Date();

  @Field(()=> String)
  @Property({type: 'text'})
  text!: string;

  @ManyToOne(() => Thread)
  thread!: Thread;
}