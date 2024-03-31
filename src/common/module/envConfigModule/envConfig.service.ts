import { Injectable } from "@nestjs/common";

import "dotenv/config"; // important!!

@Injectable() // Может тут и не нужен декоратор, я хз. (Можно проверить при построении фабрики в @nest/JwtModule)
export class EnvConfigService {
  constructor() {}

  get env(): NodeJS.ProcessEnv {
    return process.env;
  }
}
