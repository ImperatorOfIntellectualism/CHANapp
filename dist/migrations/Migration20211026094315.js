"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211026094315 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211026094315 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" drop constraint if exists "post_created_at_check";');
        this.addSql('alter table "post" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "created_at" set not null;');
        this.addSql('alter table "post" drop constraint if exists "post_updated_at_check";');
        this.addSql('alter table "post" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
        this.addSql('alter table "post" alter column "updated_at" set not null;');
        this.addSql('alter table "user" add constraint "user_login_unique" unique ("login");');
    }
}
exports.Migration20211026094315 = Migration20211026094315;
//# sourceMappingURL=Migration20211026094315.js.map