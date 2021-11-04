import { MikroORM } from '@mikro-orm/core'
import { __prod__ } from './constants';
import config from './mikro-orm.config'
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql'
import {HelloResolver} from './resolvers/hello'
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import { ThreadResolver } from './resolvers/thread';
import { BoardResolver } from './resolvers/board';
import fetch from '../node_modules/node-fetch';

//Persist And Flush - adds model to the table

const main = async ( ) => {
    const app = express()
    const apolloServer = new ApolloServer({schema: await buildSchema({resolvers: [HelloResolver, PostResolver, UserResolver, ThreadResolver, BoardResolver], validate: false}), context: () => ({em: orm.em})})
    await apolloServer.start();
    apolloServer.applyMiddleware({app})
    const orm = await MikroORM.init(config) 
    await orm.getMigrator().up()

    app.use(function(_, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
      });

    app.post('/sendimage', (req, _) => {
        fetch('https://api.cloudinary.com/v1_1/imperatorofintellectualism/image/upload',{
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': 'multipart/form-data',
      },
      body: req.body})
    })
    
    app.get('/', (_,res)=>{res.send("CACHINNATION")})
    app.listen(3001, ()=> {console.log("Server is running")})
}

main().catch((err)=> console.error(err))
