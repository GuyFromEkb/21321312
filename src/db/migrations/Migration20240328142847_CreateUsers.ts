import { Migration } from '@mikro-orm/migrations';

export class Migration20240328142847_CreateUsers extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" uuid not null, "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "bio" varchar(255) null, "created_at" int not null default 1711654126989, "updated_at" int not null default 1711654126989, constraint "users_pkey" primary key ("id"));');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
