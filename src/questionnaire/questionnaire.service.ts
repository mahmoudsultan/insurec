import { Injectable } from '@nestjs/common';

import { Ques } from '@prisma/client';

import { omit } from 'lodash';

import { CreateQuestionnaireDto } from './dto/create-questionnaire.dto';
import { QuestionnaireDao } from './dao/questionnaire.dao';

@Injectable()
export class QuestionnaireService {
  constructor(private readonly quesDao: QuestionnaireDao) {}

  create(ques: CreateQuestionnaireDto): Promise<Ques> {
    const userId = ques.userId || ques.user?.id;

    if (!userId) {
      throw new Error('LISTING_INVALID');
    }

    const questCreateInput = {
      ...omit(ques, ['user', 'userId']),
      userId,
    };

    return this.quesDao.create(questCreateInput);
  }

  delete(id: number): Promise<Ques> {
    return this.quesDao.delete(id);
  }
}
