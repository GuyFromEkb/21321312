import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

import { AppModule } from "~app.module";
import { EnvConfigService } from "~common/module/envConfigModule";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const port = app.get(EnvConfigService).env.SERVER_PORT;

  const config = new DocumentBuilder()
    .addBearerAuth()
    /** Note for Swagger UI and Swagger Editor users: Cookie authentication is currently not supported for "try it out"
     requests due to browser security restrictions. See this issue for more information. SwaggerHub does not have this limitation.
     Крч, нужно просто залогинится через /login и токен сам прикрепится... будет всё работать (/updateToken из под свагер UI)
    .addCookieAuth(COOKIE_REFRESH_TOKEN_KEY) */
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
