import { Migration } from '@mikro-orm/migrations';

export class Migration20240327152240_CreateTags extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "tags" ("id" serial primary key, "name" varchar(255) not null, "optional_property" varchar(255) null);',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tags" cascade;');
  }
}
