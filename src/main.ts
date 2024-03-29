import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "~app/app.module";
import { EnvConfigService } from "~common/provider/envConfigServiceProvider";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(EnvConfigService).env.SERVER_PORT;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port);
}
bootstrap();
