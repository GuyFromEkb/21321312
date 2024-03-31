import { Global, Module } from "@nestjs/common";

import { envConfigService } from "./envConfig.instance";
import { EnvConfigService } from "./envConfig.service";

@Global()
@Module({
  providers: [{ provide: EnvConfigService, useValue: envConfigService }],
  exports: [EnvConfigService],
})
export class EnvConfigModule {}
