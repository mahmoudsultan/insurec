import { Test, TestingModule } from '@nestjs/testing';
import { QuesController } from './ques.controller';

describe('QuesController', () => {
  let controller: QuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuesController],
    }).compile();

    controller = module.get<QuesController>(QuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
