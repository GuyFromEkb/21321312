import { Migration } from '@mikro-orm/migrations';

export class Migration20240403211233_init extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user_sessions" ("token" varchar(255) not null, "user_agent" varchar(255) not null, "user_id" uuid not null, constraint "user_sessions_pkey" primary key ("token"));');
    this.addSql('alter table "user_sessions" add constraint "user_sessions_user_id_unique" unique ("user_id");');

    this.addSql('alter table "user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user_sessions" cascade;');
  }

}
