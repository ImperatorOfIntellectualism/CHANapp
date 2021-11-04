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
import { Thread } from '../entities/Thread';
import { Board } from '../entities/Board';
let boardArgs = class boardArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], boardArgs.prototype, "title", void 0);
boardArgs = __decorate([
    ArgsType()
], boardArgs);
let BoardResolver = class BoardResolver {
    boards({ em }) {
        return em.find(Board, {});
    }
    board(id, { em }) {
        return em.findOne(Board, { id }, ['threads']);
    }
    async createBoard({ title }, { em }) {
        const board = em.create(Board, { title });
        await em.persistAndFlush(board);
        return board;
    }
    async updateBoard(id, threadId, { em }) {
        const board = await em.findOne(Board, { id });
        const thread = await em.findOne(Thread, { id: threadId });
        if (!board) {
            return null;
        }
        board.threads.add(thread);
        await em.persistAndFlush(board);
        return board;
    }
    async deleteBoard(id, { em }) {
        const board = await em.findOne(Board, { id });
        if (!board) {
            return null;
        }
        await em.removeAndFlush(board);
        return `${board.id} got successfully removed`;
    }
};
__decorate([
    Query(() => [Board], { nullable: true }),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "boards", null);
__decorate([
    Query(() => Board, { nullable: true }),
    __param(0, Arg("id", () => Int)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "board", null);
__decorate([
    Mutation(() => Board),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boardArgs, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "createBoard", null);
__decorate([
    Mutation(() => Board, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Arg("threadId", () => Number)),
    __param(2, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "updateBoard", null);
__decorate([
    Mutation(() => Board, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "deleteBoard", null);
BoardResolver = __decorate([
    Resolver()
], BoardResolver);
export { BoardResolver };
//# sourceMappingURL=board.js.map