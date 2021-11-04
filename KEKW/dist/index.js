"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const hello_1 = require("./resolvers/hello");
const post_1 = require("./resolvers/post");
const user_1 = require("./resolvers/user");
const thread_1 = require("./resolvers/thread");
const board_1 = require("./resolvers/board");
const main = async () => {
    const _importDynamic = new Function('modulePath', 'return import(modulePath)');
    const fetch = (await _importDynamic('node-fetch')).default;
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({ schema: await (0, type_graphql_1.buildSchema)({ resolvers: [hello_1.HelloResolver, post_1.PostResolver, user_1.UserResolver, thread_1.ThreadResolver, board_1.BoardResolver], validate: false }), context: () => ({ em: orm.em }) });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
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