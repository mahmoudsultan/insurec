import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '@src/prisma/prisma.module';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserDao } from './dao/user.dao';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [UsersService, UserDao],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
