import { Migration } from "@mikro-orm/migrations";

export class Migration20240410123443_createUserAndUserSession extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null default gen_random_uuid(), "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'ADMIN\', \'MODERATOR\', \'USER\')) not null default \'USER\', "bio" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql(
      'create table "user_sessions" ("token" varchar(255) not null, "user_agent" varchar(255) not null, "user_id" uuid not null, constraint "user_sessions_pkey" primary key ("token"));',
    );

    this.addSql(
      'alter table "user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_sessions" drop constraint "user_sessions_user_id_foreign";');

    this.addSql('drop table if exists "users" cascade;');

    this.addSql('drop table if exists "user_sessions" cascade;');
  }
}
