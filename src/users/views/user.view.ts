import { User, Trait } from '@prisma/client';

import * as _ from 'lodash';
import { UserWithTraits } from '../dto/user-with-traits.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserView {
  @ApiModelProperty({ description: 'id', type: Number })
  readonly id: number;

  @ApiModelProperty({ description: 'Email', type: String })
  readonly email: string;
}

export class UserWithTraitsView extends UserView {
  @ApiModelProperty({ description: 'List of user traits', type: [Trait] })
  readonly traits: Trait[];
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

  static renderWithTraits(user: UserWithTraits): UserWithTraitsView {
    return {
      ...UserViewBlueprint.renderOne(user),
      traits: user.traits || [],
    }
  }

  private static renderOne(user: User): UserView {
    return _.pick(user, ['id', 'email']);
  }
}
