import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';
import { QuestionnaireModule } from '@src/questionnaire/questionnaire.module';

import { UsersService } from './users.service';
import { UserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule, QuestionnaireModule],
      providers: [UsersService, UserDao, UserRepository],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
