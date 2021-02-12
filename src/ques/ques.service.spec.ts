import { Test, TestingModule } from '@nestjs/testing';
import { QuesService } from './ques.service';

describe('QuesService', () => {
  let service: QuesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuesService],
    }).compile();

    service = module.get<QuesService>(QuesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
