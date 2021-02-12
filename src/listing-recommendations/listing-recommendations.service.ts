import { Injectable } from '@nestjs/common';
import { ListingRecommendation } from '@prisma/client';

import { omit } from 'lodash';

import { ListingRecommendationDao } from './dao/listing-recommendation.dao';
import { CreateListingRecommendationDto } from './dto/create-listing-recommendation.dto';

@Injectable()
export class ListingRecommendationsService {
  constructor(private readonly listingRecommendationDao: ListingRecommendationDao) {}

  listingRecommendations(page?: number, limit?: number): Promise<ListingRecommendation[]> {
    return this.listingRecommendationDao.listingRecommendations(page, limit);
  }

  listingRecommendationById(id: number): Promise<ListingRecommendation> {
    return this.listingRecommendationDao.listingRecommendationById(id);
  }

  create(listingRecommendationAttr: CreateListingRecommendationDto) {
    const listingId = listingRecommendationAttr.listingId || listingRecommendationAttr.listing?.id;

    if (!listingId) {
      throw new Error('LISTING_INVALID');
    }

    const listingRecommendationCreateInput = {
      ...omit(listingRecommendationAttr, ['listingId', 'listing']),
      listing: {
        connect: {
          where: { 
            id: listingId,
          },
        },
      },
    };

    return this.listingRecommendationDao.create(listingRecommendationCreateInput);
  }
}
