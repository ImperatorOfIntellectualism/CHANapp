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
import { Post } from '../entities/Post';
import { Arg, Args, ArgsType, Ctx, Field, Int, Mutation, Query, Resolver } from 'type-graphql';
let postArgs = class postArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], postArgs.prototype, "text", void 0);
postArgs = __decorate([
    ArgsType()
], postArgs);
let PostResolver = class PostResolver {
    posts({ em }) {
        return em.find(Post, {});
    }
    post(id, { em }) {
        return em.findOne(Post, { id });
    }
    async createPost({ text }, { em }) {
        const post = em.create(Post, { text });
        await em.persistAndFlush(post);
        return post;
    }
    async deletePost(id, { em }) {
        const post = await em.findOne(Post, { id });
        if (!post) {
            return null;
        }
        await em.removeAndFlush(post);
        return `${post.id} got successfully removed`;
    }
};
__decorate([
    Query(() => [Post]),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    Query(() => Post, { nullable: true }),
    __param(0, Arg("id", () => Int)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    Mutation(() => Post),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [postArgs, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    Mutation(() => Post, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    Resolver()
], PostResolver);
export { PostResolver };
//# sourceMappingURL=post.js.map