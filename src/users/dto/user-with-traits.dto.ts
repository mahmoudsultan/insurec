import { User, Trait } from '@prisma/client';

export interface UserWithTraits extends User {
  traits: Trait[],
}
