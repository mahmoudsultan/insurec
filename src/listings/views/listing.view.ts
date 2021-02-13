import { Listing } from '@prisma/client';

import * as _ from 'lodash';
import { ApiModelProperty } from '@nestjs/swagger';

export class ListingView {
  @ApiModelProperty({ example: 1 })
  readonly id: number;

  @ApiModelProperty({ example: 'Health Insurance' })
  readonly name: string;

  @ApiModelProperty({ example: 'More details about the listing' })
  readonly description?: string;
}

export class ListingViewBlueprint {
  static render(listings: Listing): ListingView;
  static render(listings: Listing[]): ListingView[];
  static render(listings: Listing | Listing[]): ListingView | ListingView[] {
    if (Array.isArray(listings)) {
      return listings.map((listing) => this.renderOne(listing)) as ListingView[];
    }

    return this.renderOne(listings) as ListingView;
  }

  private static renderOne(listing: Listing): ListingView {
    return _.pick(listing, ['id', 'name', 'description']);
  }
}
