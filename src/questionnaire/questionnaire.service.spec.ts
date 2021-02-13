import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '@src/prisma/prisma.module';

import { QuestionnaireService } from './questionnaire.service';
import { QuestionnaireDao } from './dao/questionnaire.dao';

describe('QuesService', () => {
  let service: QuestionnaireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [QuestionnaireService, QuestionnaireDao],
    }).compile();

    service = module.get<QuestionnaireService>(QuestionnaireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
