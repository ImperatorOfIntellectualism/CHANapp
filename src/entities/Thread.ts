import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Board } from "./Board";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Thread {

@Field(()=> Int)
  @PrimaryKey()
  id!: number;

  @Field(()=> String)
  @Property({type: 'date'})
  createdAt = new Date();

  @Field(()=> String)
  @Property({type: 'text'})
  title!: string;

  @Field(()=> String)
  @Property({type: 'text'})
  op!: string;

  @Field(()=> [Post])
  @OneToMany(() => Post, post => post.thread)
  posts = new Collection<Post>(this);

  @ManyToOne(() => Board)
  board!: Board;
}