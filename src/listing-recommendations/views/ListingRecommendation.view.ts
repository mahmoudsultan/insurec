import { ListingRecommendation } from '@prisma/client';

import * as _ from 'lodash';

import { ListingRecommendationTraits } from '../dto/listing-recommendation-traits.dto';

export interface ListingRecommendationView {
  readonly id: number;
  readonly traits: ListingRecommendationTraits[];
  readonly listingId: number;
}

export class ListingRecommendationViewBlueprint {
  static render(listingsRecommendation: ListingRecommendation): ListingRecommendationView;
  static render(listingsRecommendation: ListingRecommendation[]): ListingRecommendationView[];
  static render(listingsRecommendation: ListingRecommendation | ListingRecommendation[]): ListingRecommendationView | ListingRecommendationView[] {
    if (Array.isArray(listingsRecommendation)) {
      return listingsRecommendation.map((listing) => this.renderOne(listing)) as ListingRecommendationView[];
    }

    return this.renderOne(listingsRecommendation) as ListingRecommendationView;
  }

  private static renderOne(listing: ListingRecommendation): ListingRecommendationView {
    return _.pick(listing, ['id', 'traits', 'listingId']);
  }
}
