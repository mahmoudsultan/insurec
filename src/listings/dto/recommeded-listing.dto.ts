import { Trait } from '@prisma/client';

export interface RecommendedListingDto {
  id: number;
  name: string;
  description: string;
  traits: Trait[];
  numOfMatches: number;
}
