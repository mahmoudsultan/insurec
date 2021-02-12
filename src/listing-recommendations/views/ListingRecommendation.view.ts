import { ListingRecommendation } from '@prisma/client';

import * as _ from 'lodash';

export interface ListingRecommendationView {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
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
    return _.pick(listing, ['id', 'name', 'description']);
  }
}
