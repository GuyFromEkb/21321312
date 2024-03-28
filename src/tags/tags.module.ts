import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';

import { LoggerMiddleware } from '~common/middleware/LoggerMiddleware/Logger.middleware';

import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
