import { Injectable } from '@nestjs/common';
import { ListingRecommendation, Prisma, Trait } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

import { omit } from 'lodash';

@Injectable()
export class ListingRecommendationDao {
  constructor(private readonly prisma: PrismaService) {}

  listingRecommendations(startAfter?: number, limit?: number): Promise<ListingRecommendation[]> {
    let config: any = { take: limit, skip: startAfter ? 1 : 0 }
    if (startAfter) {
      config = { ...config, cursor: { id: startAfter } };
    }

    return this.prisma.listingRecommendation.findMany(config);
  }

  listingRecommendationById(id: number): Promise<ListingRecommendation> {
    return this.listingRecommendation({ id });
  }

  listingRecommendation(listingRecommendationWhereUniqInput: Prisma.ListingRecommendationWhereUniqueInput): Promise<ListingRecommendation> {
    return this.prisma.listingRecommendation.findUnique({ where: listingRecommendationWhereUniqInput });
  }

  create(listingRecommendation: Prisma.ListingRecommendationCreateInput): Promise<ListingRecommendation> {
    return this.prisma.listingRecommendation.create({
      data: {
        ...omit(listingRecommendation, 'traits'),
        traits: {
          set: listingRecommendation.traits as Trait[],
        },
      },
    });
  }

  delete(id: number): Promise<ListingRecommendation> {
    return this.prisma.listingRecommendation.delete({ where: { id } });
  }
}
