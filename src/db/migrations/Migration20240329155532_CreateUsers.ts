import { Migration } from "@mikro-orm/migrations";

export class Migration20240329155532_CreateUsers extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" uuid not null default gen_random_uuid(), "username" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" text check ("role" in (\'ADMIN\', \'MODERATOR\', \'USER\')) not null default \'USER\', "bio" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "users_pkey" primary key ("id"));',
    );
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }
}
