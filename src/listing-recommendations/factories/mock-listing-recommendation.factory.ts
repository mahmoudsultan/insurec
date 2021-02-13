import { ListingRecommendation } from '@prisma/client';

import * as _ from 'lodash';

import { MockListingFactory } from '@src/listings/factories/mock-listing.factory';

import { ListingRecommendationTraits } from '../dto/listing-recommendation-traits.dto';
import { CreateListingRecommendationDto } from '../dto/create-listing-recommendation.dto';

export class MockListingRecommendationFactory {
  private default(overrideFields?: Record<string, unknown>): ListingRecommendation {
    return {
      id: Math.random() * 10,
      traits: _.sample(ListingRecommendationTraits, 2),
      listingId: new MockListingFactory().getOne().id,
      ...overrideFields
    }
  }

  private defaultAttributes(overrideFields?: Record<string, unknown>): CreateListingRecommendationDto {
    return {
      traits: _.sample(ListingRecommendationTraits, 2),
      listingId: new MockListingFactory().getOne().id,
      ...overrideFields
    }
  }

  getOne(overrideFields?: Record<string, unknown>): ListingRecommendation {
    return { ...this.default(), ...overrideFields };
  }

  getMany(count: number, overrideFields?: Record<string, unknown>): ListingRecommendation[] {
    const mockListing = this.getOne(overrideFields);

    return _.times(count, () => ({ ...mockListing }));
  }

  attributes(overrideFields?: Record<string, unknown>): CreateListingRecommendationDto {
    return { ...this.defaultAttributes(), ...overrideFields };
  }
}
