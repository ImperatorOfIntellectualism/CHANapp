import { MyContext } from '../types'
import {Arg, Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver} from 'type-graphql'
import { Thread } from '../entities/Thread'
import { Board } from '../entities/Board';

@ArgsType()
class boardArgs {
  @Field(() => String)
  title!: string;
}

@Resolver()
export class BoardResolver{
    @Query(() => [Board], {nullable: true})
    boards(
        @Ctx() {em}: MyContext): Promise<Board[]>
        {
        return em.find(Board, {})
    }

    @Query(() => Board, {nullable: true})
    board(
        @Arg("id", ()=> Int) id: number,
        @Ctx() {em}: MyContext): Promise<Board | null>
        {
        return em.findOne(Board, {id}, ['threads'])
    }
    
    //thread(ARGUMENT: DATA){ 
    //THE COLUMN
    //}

    @Mutation(() => Board)
    async createBoard(
        @Args() {title} : boardArgs,
        @Ctx() {em}: MyContext): Promise<Board>
        {
            const board = em.create(Board, {title})
            await em.persistAndFlush(board)
            return board
        }
    
    @Mutation(() => Board, {nullable: true})
    async updateBoard(
        @Arg("id", ()=> Number) id: number,
        @Arg("threadId", ()=> Number) threadId: number,
        @Ctx() {em}: MyContext): Promise<Board | null>
        {
            const board = await em.findOne(Board, {id})
            const thread = await em.findOne(Thread, {id: threadId})
            if (!board){
                return null
            }
            // @ts-ignore
            board.threads.add(thread)
            await em.persistAndFlush(board)
            return board
        }

    @Mutation(() => Board, {nullable: true})
    async deleteBoard(
        @Arg("id", ()=> Number) id: number,
        @Ctx() {em}: MyContext): Promise<String | null>
        {
            const board = await em.findOne(Board, {id})
            if (!board){
                return null
            }
            await em.removeAndFlush(board)
            return `${board.id} got successfully removed`
        }
}