import { URL, fileURLToPath } from "node:url"
import { MikroORM } from "@mikro-orm/core"

import { __prod__ } from "./constants.js"
import { Post } from "./entities/Post.js"
import { User } from "./entities/User.js"
import { Thread } from "./entities/Thread.js"
import { Board } from "./entities/Board.js"

export default {
    migrations: {
      path: fileURLToPath(new URL('migrations', import.meta.url)), // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post, User, Thread, Board],
    dbName: "Chanapp",
    password: '12345',
    type: "postgresql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
