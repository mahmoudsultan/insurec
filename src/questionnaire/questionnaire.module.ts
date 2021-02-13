import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { AuthMiddleware } from '@src/users/middlewares/auth.middleware';

import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDao } from './dao/questionnaire.dao';
import { QuestionnaireController } from './questionnaire.controller';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [QuestionnaireService, QuestionnaireDao],
  controllers: [QuestionnaireController],
  exports: [QuestionnaireDao]
})
export class QuestionnaireModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(QuestionnaireController);
  }
}
