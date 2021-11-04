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
import { Arg, Args, ArgsType, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { User } from '../entities/User';
let userArgs = class userArgs {
};
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], userArgs.prototype, "login", void 0);
__decorate([
    Field(() => String),
    __metadata("design:type", String)
], userArgs.prototype, "password", void 0);
userArgs = __decorate([
    ArgsType()
], userArgs);
let FieldError = class FieldError {
};
__decorate([
    Field(),
    __metadata("design:type", String)
], FieldError.prototype, "field", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], FieldError.prototype, "message", void 0);
FieldError = __decorate([
    ObjectType()
], FieldError);
let UserResponse = class UserResponse {
};
__decorate([
    Field(() => [FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    Field(() => User, { nullable: true }),
    __metadata("design:type", User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    ObjectType()
], UserResponse);
let UserResolver = class UserResolver {
    users({ em }) {
        return em.find(User, {});
    }
    async createUser({ login, password }, { em }) {
        const userCandidate = await em.findOne(User, { login: login });
        if (userCandidate) {
            return { errors: [{
                        field: "user",
                        message: "Such user already exists."
                    }] };
        }
        else if (login.length < 3) {
            return { errors: [{
                        field: "login",
                        message: "The login is too short."
                    }] };
        }
        else if (password.length < 3) {
            return { errors: [{
                        field: "password",
                        message: "The password is too short."
                    }] };
        }
        else {
            const user = em.create(User, { login: login, password: password });
            await em.persistAndFlush(user);
            return { user };
        }
    }
    async login({ login, password }, { em }) {
        const user = await em.findOne(User, { login: login, password: password });
        if (!user) {
            return { errors: [{
                        field: "user",
                        message: "Such user doesn't exist."
                    }] };
        }
        else if (login.length < 3) {
            return { errors: [{
                        field: "login",
                        message: "The login is too short."
                    }] };
        }
        else if (password.length < 3) {
            return { errors: [{
                        field: "password",
                        message: "The password is too short."
                    }] };
        }
        else {
            return { user };
        }
    }
    async deleteUser(id, { em }) {
        const user = await em.findOne(User, { id });
        if (!user) {
            return null;
        }
        await em.removeAndFlush(user);
        return `${user.id} got successfully removed`;
    }
};
__decorate([
    Query(() => [User]),
    __param(0, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userArgs, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    Mutation(() => UserResponse),
    __param(0, Args()),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [userArgs, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    Mutation(() => User, { nullable: true }),
    __param(0, Arg("id", () => Number)),
    __param(1, Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    Resolver()
], UserResolver);
export { UserResolver };
//# sourceMappingURL=user.js.map