import { User } from '@prisma/client';

import * as _ from 'lodash';
import { UserWithTraits } from '../dto/user-with-traits.dto';

export interface UserView {
  readonly id: number;
  readonly email: string;
}

export class UserViewBlueprint {
  static render(users: User): UserView;
  static render(users: User[]): UserView[];
  static render(users: User | User[]): UserView | UserView[] {
    if (Array.isArray(users)) {
      return users.map((user) => this.renderOne(user)) as UserView[];
    }

    return this.renderOne(users) as UserView;
  }

  static renderWithTraits(user: UserWithTraits) {
    return {
      ...UserViewBlueprint.renderOne(user),
      traits: user.traits || [],
    }
  }

  private static renderOne(user: User): UserView {
    return _.pick(user, ['id', 'email']);
  }
}
