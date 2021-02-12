import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { User } from '@prisma/client';

import * as bycrpt from 'bcrypt';
import { omit } from 'lodash';

import { CreateUserDto } from './dto/create-user.dto';
import { UserDao } from './dao/user.dao';
import { UserRepository } from './repository/user.repository';

import { generateJWT, verifyAndDecode } from './utils/jwt'
import { UserWithTraits } from './dto/user-with-traits.dto';

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService,
              private readonly userDao: UserDao,
              private readonly userRepository: UserRepository) {}

  async signUp(user: CreateUserDto): Promise<User> {
    const saltRounds = Number.parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS'));
    const salt = await bycrpt.genSalt(saltRounds);
    const passwordHash = await bycrpt.hash(user.password, salt);

    const userAttr = {
      ...omit(user, ['password']),
      passwordHash,
    };

    return this.userDao.create(userAttr);
  }

  async login(email: string, password: string): Promise<string> {
    const userByEmail = await this.userDao.user({ email });
    const isCorrectPassword = await bycrpt.compare(password, userByEmail.passwordHash);
    if (!isCorrectPassword) {
      throw new Error('INVALID_PASSWORD');
    }

    return this.generateJWT(userByEmail);
  }
  
  async generateJWT(user: User): Promise<string> {
    return generateJWT(user, this.configService.get<string>('JWT_SECRET'));
  }

  async verifyAndDecode(token: string): Promise<User> {
    const userData = await verifyAndDecode<User>(token, this.configService.get<string>('JWT_SECRET'));

    return userData;
  }

  userWithTrais(userId: number): Promise<UserWithTraits> {
    return this.userRepository.userWithTraits(userId);
  }
}
