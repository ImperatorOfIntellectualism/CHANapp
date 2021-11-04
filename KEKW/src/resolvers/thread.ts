import { Arg, Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import { MyContext } from '../types.js'
import { Thread } from '../entities/Thread.js'
import { Post } from '../entities/Post.js'

@ArgsType()
class threadArgs {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  op!: string;
}

@Resolver()
export class ThreadResolver{
    @Query(() => [Thread], {nullable: true})
    threads(
        @Ctx() {em}: MyContext): Promise<Thread[]>
        {
        return em.find(Thread, {})
    }

    @Query(() => Thread, {nullable: true})
    thread(
        @Arg("id", ()=> Int) id: number,
        @Ctx() {em}: MyContext): Promise<Thread | null>
        {
        return em.findOne(Thread, {id}, ['posts'])
    }

    //thread(ARGUMENT: DATA){
    //THE COLUMN
    //}

    @Mutation(() => Thread)
    async createThread(
        @Args() {title, op} : threadArgs,
        @Ctx() {em}: MyContext): Promise<Thread>
        {
            const thread = em.create(Thread, {title: title, op: op})
            await em.persistAndFlush(thread)
            return thread
        }

    @Mutation(() => Thread, {nullable: true})
    async updateThread(
        @Arg("id", ()=> Number) id: number,
        @Arg("postId", ()=> Number) postId: number,
        @Ctx() {em}: MyContext): Promise<Thread | null>
        {
            const thread = await em.findOne(Thread, {id})
            const post = await em.findOne(Post, {id: postId})
            if (!thread){
                return null
            }
            // @ts-ignore
            thread.posts.add(post)
            await em.persistAndFlush(thread)
            return thread
        }

    @Mutation(() => Thread, {nullable: true})
    async deleteThread(
        @Arg("id", ()=> Number) id: number,
        @Ctx() {em}: MyContext): Promise<String | null>
        {
            const thread = await em.findOne(Thread, {id})
            if (!thread){
                return null
            }
            await em.removeAndFlush(thread)
            return `${thread.id} got successfully removed`
        }
}