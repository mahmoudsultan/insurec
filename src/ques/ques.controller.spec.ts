import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@src/prisma/prisma.module';

import { QuesService } from './ques.service';
import { QuesDao } from './dao/ques.dao';
import { QuesController } from './ques.controller';

describe('QuesController', () => {
  let controller: QuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [QuesService, QuesDao],
      controllers: [QuesController]
    }).compile();

    controller = module.get<QuesController>(QuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
