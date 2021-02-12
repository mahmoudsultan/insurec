import { Trait } from '@prisma/client';

export const recommendedListingsForTratisQuery = (traits: Trait[]): string => {
  return `
    SELECT 
      L.id, L.name, L.description, LR.traits, cardinality(LR.traits) as numOfMatches
    FROM "public"."ListingRecommendation" LR
    INNER JOIN "public"."Listing" L ON LR."listingId" = L.id
    WHERE traits <@ ARRAY['${traits.join("','")}']::"public"."Trait"[] 
    ORDER BY cardinality(traits) DESC
  `;
};
