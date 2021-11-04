import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import { URL, fileURLToPath } from "url";
import { User } from "./entities/User";
import { Thread } from "./entities/Thread";
import { Board } from "./entities/Board";
export default {
    migrations: {
        path: fileURLToPath(new URL('migrations', import.meta.url)),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post, User, Thread, Board],
    dbName: "Chanapp",
    password: '12345',
    type: "postgresql",
    debug: !__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map