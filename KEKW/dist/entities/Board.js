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
exports.Board = void 0;
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
const Thread_1 = require("./Thread");
let Board = class Board {
    constructor() {
        this.threads = new core_1.Collection(this);
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Board.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [Thread_1.Thread]),
    (0, core_1.OneToMany)(() => Thread_1.Thread, thread => thread.board),
    __metadata("design:type", Object)
], Board.prototype, "threads", void 0);
Board = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], Board);
exports.Board = Board;
//# sourceMappingURL=Board.js.map