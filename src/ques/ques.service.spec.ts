import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '@src/prisma/prisma.module';

import { QuesService } from './ques.service';
import { QuesDao } from './dao/ques.dao';

describe('QuesService', () => {
  let service: QuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [QuesService, QuesDao],
    }).compile();

    service = module.get<QuesService>(QuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
