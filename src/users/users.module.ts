import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDao } from './dao/user.dao';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [UsersService, UserDao],
  controllers: [UsersController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude(
      { path: '/users', method: RequestMethod.POST },
      { path: '/users/login', method: RequestMethod.POST }
    ).forRoutes(UsersController)
  }
}
