import { Arg, Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Post } from '../entities/Post.js'
import { MyContext } from '../types.js'

@ArgsType()
class postArgs {
  @Field(() => String)
  text!: string;
}

@Resolver()
export class PostResolver{
    @Query(() => [Post])
    posts(
        @Ctx() {em}: MyContext): Promise<Post[]>
        {
        return em.find(Post, {})
    }

    @Query(() => Post, {nullable: true})
    post(
        @Arg("id", ()=> Int) id: number,
        @Ctx() {em}: MyContext): Promise<Post | null>
        {
        return em.findOne(Post, {id})
    }

    //post(ARGUMENT: DATA){
    //THE COLUMN
    //}

    @Mutation(() => Post)
    async createPost(
        @Args() {text} : postArgs,
        @Ctx() {em}: MyContext): Promise<Post>
        {
            const post = em.create(Post, {text})
            await em.persistAndFlush(post)
            return post
        }

    @Mutation(() => Post, {nullable: true})
    async deletePost(
        @Arg("id", ()=> Number) id: number,
        @Ctx() {em}: MyContext): Promise<String | null>
        {
            const post = await em.findOne(Post, {id})
            if (!post){
                return null
            }
            await em.removeAndFlush(post)
            return `${post.id} got successfully removed`
        }
}