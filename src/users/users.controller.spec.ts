import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';
import { QuestionnaireModule } from '@src/questionnaire/questionnaire.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule, QuestionnaireModule],
      providers: [UsersService, UserDao, UserRepository],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
