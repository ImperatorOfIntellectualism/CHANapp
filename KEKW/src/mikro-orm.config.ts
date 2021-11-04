import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import { URL, fileURLToPath } from "url";
import { User } from "./entities/User";
import { Thread } from "./entities/Thread";
import { Board } from "./entities/Board";

export default {
    migrations: {
      path: fileURLToPath(new URL('migrations', import.meta.url)), // path to the folder with migrations // path to the folder with migrations
      pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    entities: [Post, User, Thread, Board],
    dbName: "Chanapp",
    password: '12345',
    type: "postgresql",
    debug: !__prod__,
} as Parameters<typeof MikroORM.init>[0];
