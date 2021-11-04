"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const Post_1 = require("./entities/Post");
const path_1 = __importDefault(require("path"));
const User_1 = require("./entities/User");
const Thread_1 = require("./entities/Thread");
const Board_1 = require("./entities/Board");
exports.default = {
    migrations: {
        path: path_1.default.join(__dirname + '/migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    },
    entities: [Post_1.Post, User_1.User, Thread_1.Thread, Board_1.Board],
    dbName: "Chanapp",
    password: '12345',
    type: "postgresql",
    debug: !constants_1.__prod__,
};
//# sourceMappingURL=mikro-orm.config.js.map