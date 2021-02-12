import { Injectable } from '@nestjs/common';

import { Ques } from '@prisma/client';

import { omit } from 'lodash';

import { CreateQuestDto } from './dto/create-ques.dto';
import { QuesDao } from './dao/ques.dao';

@Injectable()
export class QuesService {
  constructor(private readonly quesDao: QuesDao) {}

  create(ques: CreateQuestDto): Promise<Ques> {
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
