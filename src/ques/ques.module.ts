import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { AuthMiddleware } from '@src/users/middlewares/auth.middleware';

import { QuesService } from './ques.service';
import { QuesDao } from './dao/ques.dao';
import { QuesController } from './ques.controller';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuesService, QuesDao],
  controllers: [QuesController],
  exports: [QuesDao]
})
export class QuesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(QuesController);
  }
}
