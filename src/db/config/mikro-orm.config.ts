import { Migrator } from "@mikro-orm/migrations";
import { Options, PostgreSqlDriver } from "@mikro-orm/postgresql";

//Нужен относительный путь, для package.json
import { envConfigService } from "../../common/provider/envConfigServiceProvider";

const rootDir = process.cwd();

const ormConfig: Options = {
  entities: [rootDir + "/**/*.entity.js"],
  entitiesTs: [rootDir + "/**/*.entity.ts"],
  driver: PostgreSqlDriver,
  host: envConfigService.env.POSTGRES_HOST,
  port: +envConfigService.env.POSTGRES_PORT,
  user: envConfigService.env.POSTGRES_USER,
  password: envConfigService.env.POSTGRES_PASSWORD,
  dbName: envConfigService.env.POSTGRES_DB_NAME,
  debug: true,
  extensions: [Migrator],
  migrations: {
    path: __dirname + "/../migrations/",
  },
};

export default ormConfig;

/* 
npx mikro-orm --help 
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:pending  # List all pending migrations
*/
