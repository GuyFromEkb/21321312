# Nestjs Psql MicroOrm Swagger (Socket?)

## [MicroOrm doc](https://mikro-orm.io/docs/quick-start)
### Устанавливаем зависимости (psql)
`npm i @mikro-orm/core @mikro-orm/nestjs @mikro-orm/postgresql`  
(миграции):  
`npm i @mikro-orm/migrations`   
`npm i -D @mikro-orm/cli` 

создаём папку для DataBase, где будет лежать конфиг конфиг подключения нужен для (генерации миграций из под cli \  nest-app)    
`src\db\config\mikro-orm.config.ts`

```ts
import 'dotenv/config'; // important!! получить данные с .env!!

import { PostgreSqlDriver, defineConfig } from '@mikro-orm/postgresql';

const rootDir = process.cwd();
/*
* defineConfig Нужен лишь для типизации, можно вот так: 
* import { Options } from '@mikro-orm/postgresql';
* const ormConfig: Options = {...}
*/
const ormConfig = defineConfig({
  entities: [rootDir + '/**/*.entity.js'], //обязательно нужно для js
  entitiesTs: [rootDir + '/**/*.entity.ts'], //обязательно нужно для ts\js
  driver: PostgreSqlDriver, // берётся из '@mikro-orm/....ДАТАБЕЙС
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB_NAME,
});
// Дефолтный экспорт нужен, для чтение из cli (миграции). описание будет ниже
export default ormConfig;
```

Добавляем в App Module
```ts
import ormConfig from '../db/config/ormConfig';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig)],
  controllers: [AppController],
  providers: [AppService],
})
```

для миграций нужно в orm.config добавить плагин и указать,куда скадывать миграции

```ts
import { Migrator } from '@mikro-orm/migrations';

const ormConfig = defineConfig({
  ...
  extensions: [Migrator],
  migrations: {
    path: __dirname + '/../migrations/',
  },
});
```
в package.json добавить,путь до конфига для js и ts:
```json
  "mikro-orm": {
    "useTsNode": true,
    "configPaths": [
      "./src/db/config/mikro-orm.config.ts",
      "./dist/db/config/mikro-orm.config.js"
    ]
  },
```

команды cli:
```
npx mikro-orm migration:create   # Create new migration with current schema diff
npx mikro-orm migration:up       # Migrate up to the latest version
npx mikro-orm migration:down     # Migrate one step down
npx mikro-orm migration:list     # List all executed migrations
npx mikro-orm migration:check    # Check if schema is up to date
npx mikro-orm migration:pending  # List all pending migrations
npx mikro-orm migration:fresh    # Drop the database and migrate up to the latest version
```
