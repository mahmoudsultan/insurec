import { ApiModelProperty } from '@nestjs/swagger';

import { ListingRecommendation } from '@prisma/client';

import * as _ from 'lodash';

import { ListingRecommendationTraits } from '../dto/listing-recommendation-traits.dto';

export class ListingRecommendationView {
  @ApiModelProperty({ required: true })
  readonly id: number;

  @ApiModelProperty({ description: 'List of traits that this recommendation matches to.', required: true })
  readonly traits: ListingRecommendationTraits[];

  @ApiModelProperty({ description: 'Listing ID', required: true })
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
