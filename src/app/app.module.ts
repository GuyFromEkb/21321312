import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { EnvConfigServiceProvider } from "~common/provider/envConfigServiceProvider";
import ormConfig from "~db/config/mikro-orm.config";
import { UserModule } from "~user/user.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), UserModule],
  controllers: [AppController],
  providers: [AppService, EnvConfigServiceProvider],
})
export class AppModule {}
