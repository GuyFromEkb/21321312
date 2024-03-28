import { Provider } from "@nestjs/common";

import { envConfigService } from "./envConfig.instance";
import { EnvConfigService } from "./envConfig.service";

export const EnvConfigServiceProvider: Provider = {
  provide: EnvConfigService,
  useValue: envConfigService,
};
