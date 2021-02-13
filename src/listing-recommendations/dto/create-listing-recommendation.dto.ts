import { Listing } from "@prisma/client";
import { ApiModelProperty } from '@nestjs/swagger';
import { ListingRecommendationTraits } from "./listing-recommendation-traits.dto";

export class CreateListingRecommendationDto {
  @ApiModelProperty({ description: 'List of traits that this recommendation matches to.', example: ['EMPLOYED', 'HAS_CHILDREN'] })
  traits: ListingRecommendationTraits[];

  @ApiModelProperty({ description: 'ID of listing to recommend.', required: false })
  listingId?: number;

  @ApiModelProperty({ description: 'Listing object to recommend.', required: false })
  listing?: Listing;
}
