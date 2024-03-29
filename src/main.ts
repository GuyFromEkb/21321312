import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "~app/app.module";
import { EnvConfigService } from "~common/provider/envConfigServiceProvider";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(EnvConfigService).env.SERVER_PORT;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle("NestJs microOrm Jwt")
    .setDescription(`To generate and download a Swagger JSON file /api-json`)
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port, "0.0.0.0");

  const appUrl = await app.getUrl();
  Logger.log(`running on: ${appUrl}`, "NestApplication");
  Logger.log(`running on: ${appUrl}/api`, "Swagger");
}
bootstrap();
