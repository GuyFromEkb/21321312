import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AuthModule } from "~auth/auth.module";
import { EnvConfigModule } from "~common/module/envConfigModule";
import ormConfig from "~db/config/orm.config";
import { UserModule } from "~user/user.module";

@Module({
  imports: [EnvConfigModule, MikroOrmModule.forRoot(ormConfig), AuthModule, UserModule],
})
export class AppModule {}
