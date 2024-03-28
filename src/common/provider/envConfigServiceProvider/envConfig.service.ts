import "dotenv/config"; // important!!

export class EnvConfigService {
  constructor() {}

  get env(): NodeJS.ProcessEnv {
    return process.env;
  }
}
