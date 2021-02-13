import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';
import { QuestionnaireModule } from '@src/questionnaire/questionnaire.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDao } from './dao/user.dao';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { UserRepository } from './repository/user.repository';

@Module({
  imports: [PrismaModule, ConfigModule, QuestionnaireModule],
  providers: [UsersService, UserDao, AuthMiddleware, UserRepository],
  controllers: [UsersController],
  exports: [AuthMiddleware, UserRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).exclude(
      { path: '/users/:id/traits', method: RequestMethod.GET },
      { path: '/users', method: RequestMethod.POST },
      { path: '/users/login', method: RequestMethod.POST }
    ).forRoutes(UsersController)
  }
}
