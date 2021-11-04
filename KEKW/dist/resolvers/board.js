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
exports.BoardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Thread_1 = require("../entities/Thread");
const Board_1 = require("../entities/Board");
let boardArgs = class boardArgs {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], boardArgs.prototype, "title", void 0);
boardArgs = __decorate([
    (0, type_graphql_1.ArgsType)()
], boardArgs);
let BoardResolver = class BoardResolver {
    boards({ em }) {
        return em.find(Board_1.Board, {});
    }
    board(id, { em }) {
        return em.findOne(Board_1.Board, { id }, ['threads']);
    }
    async createBoard({ title }, { em }) {
        const board = em.create(Board_1.Board, { title });
        await em.persistAndFlush(board);
        return board;
    }
    async updateBoard(id, threadId, { em }) {
        const board = await em.findOne(Board_1.Board, { id });
        const thread = await em.findOne(Thread_1.Thread, { id: threadId });
        if (!board) {
            return null;
        }
        board.threads.add(thread);
        await em.persistAndFlush(board);
        return board;
    }
    async deleteBoard(id, { em }) {
        const board = await em.findOne(Board_1.Board, { id });
        if (!board) {
            return null;
        }
        await em.removeAndFlush(board);
        return `${board.id} got successfully removed`;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [Board_1.Board], { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "boards", null);
__decorate([
    (0, type_graphql_1.Query)(() => Board_1.Board, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "board", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Board_1.Board),
    __param(0, (0, type_graphql_1.Args)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boardArgs, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "createBoard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Board_1.Board, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => Number)),
    __param(1, (0, type_graphql_1.Arg)("threadId", () => Number)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "updateBoard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Board_1.Board, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => Number)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BoardResolver.prototype, "deleteBoard", null);
BoardResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], BoardResolver);
exports.BoardResolver = BoardResolver;
//# sourceMappingURL=board.js.map