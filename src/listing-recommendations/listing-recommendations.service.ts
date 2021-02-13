import { Injectable } from '@nestjs/common';
import { ListingRecommendation } from '@prisma/client';

import { omit } from 'lodash';

import { ListingRecommendationDao } from './dao/listing-recommendation.dao';
import { CreateListingRecommendationDto } from './dto/create-listing-recommendation.dto';

@Injectable()
export class ListingRecommendationsService {
  constructor(private readonly listingRecommendationDao: ListingRecommendationDao) {}

  listingRecommendations(startAfter?: number, limit?: number): Promise<ListingRecommendation[]> {
    return this.listingRecommendationDao.listingRecommendations(startAfter, limit);
  }

  listingRecommendationById(id: number): Promise<ListingRecommendation> {
    return this.listingRecommendationDao.listingRecommendationById(id);
  }

  create(listingRecommendationAttr: CreateListingRecommendationDto): Promise<ListingRecommendation> {
    const listingId = listingRecommendationAttr.listingId || listingRecommendationAttr.listing?.id;

    if (!listingId) {
      throw new Error('LISTING_INVALID');
    }

    const listingRecommendationCreateInput = {
      ...omit(listingRecommendationAttr, ['listingId', 'listing']),
      listingId,
    };

    return this.listingRecommendationDao.create(listingRecommendationCreateInput);
  }

  delete(listingRecommendationId: number): Promise<ListingRecommendation> {
    return this.listingRecommendationDao.delete(listingRecommendationId);
  }
}
