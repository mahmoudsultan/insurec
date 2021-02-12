import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UserDao {
  constructor(private readonly prisma: PrismaService) {}

  users(page?: number, limit?: number): Promise<User[]> {
    let config = {}
    if (page) {
      if (!limit) {
        throw new Error('LIMIT MUST BE PROVIDED IF PAGE IS');
      }

      config = { ...config, take: limit, skip: (page || 1) * limit };
    }

    return this.prisma.user.findMany(config);
  }

  userById(id: number): Promise<User> {
    return this.user({ id });
  }

  user(userWhereUniqInput: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.findUnique({ where: userWhereUniqInput });
  }

  create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  update(id: number, user: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ data: user, where: { id } });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } })
  }
}
