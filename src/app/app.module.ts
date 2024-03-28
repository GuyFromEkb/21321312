import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { EnvConfigServiceProvider } from '~common/provider/envConfigServiceProvider';
import ormConfig from '~db/config/mikro-orm.config';
import { TagsModule } from '~tags/tags.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MikroOrmModule.forRoot(ormConfig), TagsModule],
  controllers: [AppController],
  providers: [AppService, EnvConfigServiceProvider],
})
export class AppModule {}
