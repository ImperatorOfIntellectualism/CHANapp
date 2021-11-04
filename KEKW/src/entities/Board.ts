import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Thread } from "./Thread";

@ObjectType()
@Entity()
export class Board {

@Field(()=> Int)
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property({type: 'text'})
  title!: string;

  @Field(()=> [Thread])
  @OneToMany(() => Thread, thread => thread.board)
  threads = new Collection<Thread>(this);
}