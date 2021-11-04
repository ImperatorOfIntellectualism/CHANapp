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
import { Arg, Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Thread } from '../entities/Thread.js';
import { Post } from '../entities/Post.js';
let threadArgs = class threadArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], threadArgs.prototype, "title", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], threadArgs.prototype, "op", void 0);
threadArgs = __decorate([
    ArgsType()
], threadArgs);
let ThreadResolver = class ThreadResolver {
    threads({ em }) {
        return em.find(Thread, {});
    }
    thread(id, { em }) {
        return em.findOne(Thread, { id }, ['posts']);
    }
    async createThread({ title, op }, { em }) {
        const thread = em.create(Thread, { title: title, op: op });
        await em.persistAndFlush(thread);
        return thread;
    }
    async updateThread(id, postId, { em }) {
        const thread = await em.findOne(Thread, { id });
        const post = await em.findOne(Post, { id: postId });
        if (!thread) {
            return null;
        }
        thread.posts.add(post);
        await em.persistAndFlush(thread);
        return thread;
    }
    async deleteThread(id, { em }) {
        const thread = await em.findOne(Thread, { id });
        if (!thread) {
            return null;
        }
        await em.removeAndFlush(thread);
        return `${thread.id} got successfully removed`;
    }
};
__decorate([
    Query(() => [Thread], { nullable: true }),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "threads", null);
__decorate([
    Query(() => Thread, { nullable: true }),
    __param(0, Arg("id", () => Int)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "thread", null);
__decorate([
    Mutation(() => Thread),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [threadArgs, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "createThread", null);
__decorate([
    Mutation(() => Thread, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Arg("postId", () => Number)),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "updateThread", null);
__decorate([
    Mutation(() => Thread, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ThreadResolver.prototype, "deleteThread", null);
ThreadResolver = __decorate([
    Resolver()
], ThreadResolver);
export { ThreadResolver };
//# sourceMappingURL=thread.js.map