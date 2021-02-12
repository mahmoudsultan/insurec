import { Injectable } from '@nestjs/common';
import { Ques, Prisma } from '@prisma/client';

import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class QuesDao {
  constructor(private readonly prisma: PrismaService) {}

  latestForUser(userId: number): Promise<Ques> {
    return this.prisma.ques.findFirst({
      where: {
        userId,
      },
      orderBy: {
        id: 'desc'
      }
    });
  }

  create(ques: Prisma.QuesCreateInput): Promise<Ques> {
    return this.prisma.ques.create({ data: ques });
  }

  delete(id: number): Promise<Ques> {
    return this.prisma.ques.delete({ where: { id } });
  }
}
