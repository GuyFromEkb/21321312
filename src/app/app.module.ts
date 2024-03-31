import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { AuthModule } from "~auth/auth.module";
import { EnvConfigServiceProvider } from "~common/provider/envConfigServiceProvider";
import ormConfig from "~db/config/orm.config";
import { UserModule } from "~user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, EnvConfigServiceProvider],
})
export class AppModule {}
