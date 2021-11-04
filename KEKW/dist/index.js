import { MikroORM } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello.js';
import { PostResolver } from './resolvers/post.js';
import { UserResolver } from './resolvers/user.js';
import { ThreadResolver } from './resolvers/thread.js';
import { BoardResolver } from './resolvers/board.js';
import fetch from 'node-fetch';
const main = async () => {
    await fetch('https://httpbin.org/get').then(res => res.json()).then(console.log);
    const app = express();
    const apolloServer = new ApolloServer({ schema: await buildSchema({ resolvers: [HelloResolver, PostResolver, UserResolver, ThreadResolver, BoardResolver], validate: false }), context: () => ({ em: orm.em }) });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up();
    app.use(function (_, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.post('/sendimage', (req, _) => {
        fetch('https://api.cloudinary.com/v1_1/imperatorofintellectualism/image/upload', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': 'multipart/form-data',
            },
            body: req.body
        }).then(res => res.arrayBuffer());
    });
    app.get('/', (_, res) => { res.send("CACHINNATION"); });
    app.listen(3001, () => { console.log("Server is running"); });
};
main().catch((err) => console.error(err));
//# sourceMappingURL=index.js.map