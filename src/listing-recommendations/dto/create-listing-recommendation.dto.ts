import { Listing } from "@prisma/client";
import { ListingRecommendationTraits } from "./listing-recommendation-traits.dto";

export interface CreateListingRecommendationDto {
  traits: ListingRecommendationTraits[];
  listingId?: number;
  listing?: Listing;
}
