import { Injectable } from '@nestjs/common';
import { ListingRecommendation, Prisma } from '@prisma/client';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class ListingRecommendationDao {
  constructor(private readonly prisma: PrismaService) {}

  listingRecommendations(page?: number, limit?: number): Promise<ListingRecommendation[]> {
    let config = {}
    if (page) {
      if (!limit) {
        throw new Error('LIMIT MUST BE PROVIDED IF PAGE IS');
      }

      config = { ...config, take: limit, skip: (page || 1) * limit };
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
    return this.prisma.listingRecommendation.create({ data: listingRecommendation });
  }

  delete(id: number): Promise<ListingRecommendation> {
    return this.prisma.listingRecommendation.delete({ where: { id } });
  }
}
