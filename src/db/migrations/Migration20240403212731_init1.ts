import { Migration } from '@mikro-orm/migrations';

export class Migration20240403212731_init1 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_sessions" drop constraint "user_sessions_user_id_unique";');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_sessions" add constraint "user_sessions_user_id_unique" unique ("user_id");');
  }

}
