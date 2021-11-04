import { Arg, Args, ArgsType, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import { MyContext } from '../types.js'
import { User } from '../entities/User.js'

@ArgsType()
class userArgs {
  @Field(() => String)
  login!: string;

  @Field(() => String)
  password!: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}


@Resolver()
export class UserResolver{
    @Query(() => [User])
    users(
        @Ctx() {em}: MyContext): Promise<User[]>
        {
        return em.find(User, {})
    }

    //User(ARGUMENT: DATA){
    //THE COLUMN
    //}

    @Mutation(() => UserResponse)
    async createUser(
        @Args() {login, password} : userArgs,
        @Ctx() {em}: MyContext): Promise<UserResponse>
        {
            const userCandidate = await em.findOne(User, {login: login})
            if (userCandidate){
                return {errors: [{
                    field: "user",
                    message: "Such user already exists."
                }]}
            }
            else if( login.length < 3) {return {errors: [{
                field: "login",
                message: "The login is too short."
            }]}}
            else if( password.length < 3) {return {errors: [{
                field: "password",
                message: "The password is too short."
            }]}}
            else {
            const user = em.create(User, {login: login, password: password})
            await em.persistAndFlush(user)
            return {user}}
        }

    @Mutation(() => UserResponse)
    async login(
        @Args() {login, password} : userArgs,
        @Ctx() {em}: MyContext): Promise<UserResponse>
        {
            const user = await em.findOne(User, {login: login, password: password})
            if (!user){
                return {errors: [{
                    field: "user",
                    message: "Such user doesn't exist."
                }]}
            }
            else if( login.length < 3) {return {errors: [{
                field: "login",
                message: "The login is too short."
            }]}}
            else if( password.length < 3) {return {errors: [{
                field: "password",
                message: "The password is too short."
            }]}}
            else {
            return {user}}
        }

    @Mutation(() => User, {nullable: true})
    async deleteUser(
        @Arg("id", ()=> Number) id: number,
        @Ctx() {em}: MyContext): Promise<String | null>
        {
            const user = await em.findOne(User, {id})
            if (!user){
                return null
            }
            await em.removeAndFlush(user)
            return `${user.id} got successfully removed`
        }
}