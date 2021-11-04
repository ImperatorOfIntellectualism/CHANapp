"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Thread_1 = require("../entities/Thread");
const Post_1 = require("../entities/Post");
let threadArgs = class threadArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], threadArgs.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], threadArgs.prototype, "op", void 0);
threadArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], threadArgs);
let ThreadResolver = class ThreadResolver {
    threads({ em }) {
        return em.find(Thread_1.Thread, {});
    }
    thread(id, { em }) {
        return em.findOne(Thread_1.Thread, { id }, ['posts']);
    }
    async createThread({ title, op }, { em }) {
        const thread = em.create(Thread_1.Thread, { title: title, op: op });
        await em.persistAndFlush(thread);
        return thread;
    }
    async updateThread(id, postId, { em }) {
        const thread = await em.findOne(Thread_1.Thread, { id });
        const post = await em.findOne(Post_1.Post, { id: postId });
        if (!thread) {
            return null;
        }
        thread.posts.add(post);
        await em.persistAndFlush(thread);
        return thread;
    }
    async deleteThread(id, { em }) {
        const thread = await em.findOne(Thread_1.Thread, { id });
        if (!thread) {
            return null;
        }
        await em.removeAndFlush(thread);
        return `${thread.id} got successfully removed`;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Thread_1.Thread], { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "threads", null);
__decorate([
    (0, type_graphql_1.Query)(() => Thread_1.Thread, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "thread", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Thread_1.Thread),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [threadArgs, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "createThread", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Thread_1.Thread, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("postId", () => Number)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "updateThread", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Thread_1.Thread, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => Number)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "deleteThread", null);
ThreadResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ThreadResolver);
exports.ThreadResolver = ThreadResolver;
//# sourceMappingURL=thread.js.map