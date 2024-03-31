import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AuthModule } from "~auth/auth.module";
import { EnvConfigModule } from "~common/module/envConfigModule";
import ormConfig from "~db/config/orm.config";
import { UserModule } from "~user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [EnvConfigModule, MikroOrmModule.forRoot(ormConfig), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
