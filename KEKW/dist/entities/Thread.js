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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Board_1 = require("./Board");
const Post_1 = require("./Post");
let Thread = class Thread {
    constructor() {
        this.createdAt = new Date();
        this.posts = new core_1.Collection(this);
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Thread.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'date' }),
    __metadata("design:type", Object)
], Thread.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Thread.prototype, "op", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Post_1.Post]),
    (0, core_1.OneToMany)(() => Post_1.Post, post => post.thread),
    __metadata("design:type", Object)
], Thread.prototype, "posts", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => Board_1.Board),
    __metadata("design:type", Board_1.Board)
], Thread.prototype, "board", void 0);
Thread = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Thread);
exports.Thread = Thread;
//# sourceMappingURL=Thread.js.map