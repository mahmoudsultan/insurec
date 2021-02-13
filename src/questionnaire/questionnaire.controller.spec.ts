import { Test, TestingModule } from '@nestjs/testing';
import { PrismaModule } from '@src/prisma/prisma.module';

import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDao } from './dao/questionnaire.dao';
import { QuestionnaireController } from './questionnaire.controller';

describe('QuesController', () => {
  let controller: QuestionnaireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [QuestionnaireService, QuestionnaireDao],
      controllers: [QuestionnaireController]
    }).compile();

    controller = module.get<QuestionnaireController>(QuestionnaireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
