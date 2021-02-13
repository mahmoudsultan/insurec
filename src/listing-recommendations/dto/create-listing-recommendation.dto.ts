import { Listing } from "@prisma/client";
import { ApiModelProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, IsArray, IsObject } from 'class-validator';
import { ListingRecommendationTraits } from "./listing-recommendation-traits.dto";

export class CreateListingRecommendationDto {
  @IsArray()
  @ApiModelProperty({ description: 'List of traits that this recommendation matches to.', example: ['EMPLOYED', 'HAS_CHILDREN'] })
  traits: ListingRecommendationTraits[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiModelProperty({ description: 'ID of listing to recommend.', required: false })
  listingId?: number;

  @IsObject()
  @IsOptional()
  @ApiModelProperty({ description: 'Listing object to recommend.', required: false })
  listing?: Listing;
}
