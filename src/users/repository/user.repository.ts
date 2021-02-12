import { Injectable } from '@nestjs/common';
import { Ques } from '@prisma/client';

import { QuesDao } from '@src/ques/dao/ques.dao';

import { UserDao } from '../dao/user.dao';
import { UserWithTraits } from '../dto/user-with-traits.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly userDao: UserDao,
              private readonly quesDao: QuesDao) {}

  async userWithTraits(userId: number): Promise<UserWithTraits> {
    const user = await this.userDao.userById(userId);
    const userLatestQues = await this.quesDao.latestForUser(userId);

    const traits = this.getTraitsForUser(userLatestQues);

    return {
      ...user,
      traits,
    };
  }

  getTraitsForUser(ques: Ques) {
    if (!ques) {
      return [];
    }

    const traits = [];
    if (ques.children === 0) {
      traits.push('HAS_NO_CHILDREN');
    } else if (ques.children >= 1) {
      traits.push('HAS_CHILDREN');
    }

    if (ques.occupation) {
      traits.push(ques.occupation);
    } else {
      traits.push('UNEMPLOYED');
    }

    return traits;
  }
}
