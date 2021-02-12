import * as _ from 'lodash';

import { MockListingFactory } from '@src/listings/factories/mock-listing.factory';

import { ListingRecommendationTraits } from '../dto/listing-recommendation-traits.dto';

export class MockListingRecommendationFactory {
  private default(overrideFields?: Object) {
    return {
      id: Math.random() * 10,
      traits: _.sample(ListingRecommendationTraits, 2),
      listing: new MockListingFactory().getOne(),
      ...overrideFields
    }
  }

  private defaultAttributes(overrideFields?: Object) {
    return {
      traits: _.sample(ListingRecommendationTraits, 2),
      listing: new MockListingFactory().getOne(),
      ...overrideFields
    }
  }

  getOne(overrideFields?: Object) {
    return { ...this.default(), ...overrideFields };
  }

  getMany(count: number, overrideFields?: Object) {
    const mockListing = this.getOne(overrideFields);

    return _.times(count, () => ({ ...mockListing }));
  }

  attributes(overrideFields?: Object) {
    return { ...this.defaultAttributes(), ...overrideFields };
  }
}
