var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";
import { Board } from "./Board.js";
import { Post } from "./Post.js";
let Thread = class Thread {
    constructor() {
        this.createdAt = new Date();
        this.posts = new Collection(this);
    }
};
__decorate([
    Field(() => Int),
    PrimaryKey(),
    __metadata("design:type", Number)
], Thread.prototype, "id", void 0);
__decorate([
    Field(() => String),
    Property({ type: 'date' }),
    __metadata("design:type", Object)
], Thread.prototype, "createdAt", void 0);
__decorate([
    Field(() => String),
    Property({ type: 'text' }),
    __metadata("design:type", String)
], Thread.prototype, "title", void 0);
__decorate([
    Field(() => String),
    Property({ type: 'text' }),
    __metadata("design:type", String)
], Thread.prototype, "op", void 0);
__decorate([
    Field(() => [Post]),
    OneToMany(() => Post, post => post.thread),
    __metadata("design:type", Object)
], Thread.prototype, "posts", void 0);
__decorate([
    ManyToOne(() => Board),
    __metadata("design:type", Board)
], Thread.prototype, "board", void 0);
Thread = __decorate([
    ObjectType(),
    Entity()
], Thread);
export { Thread };
//# sourceMappingURL=Thread.js.map