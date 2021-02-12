import { Module } from '@nestjs/common';
import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationsController } from './listing-recommendations.controller';

@Module({
  providers: [ListingRecommendationsService],
  controllers: [ListingRecommendationsController]
})
export class ListingRecommendationsModule {}
