import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationsController } from './listing-recommendations.controller';
import { ListingRecommendationDao } from './dao/listing-recommendation.dao';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [ListingRecommendationsService, ListingRecommendationDao],
  controllers: [ListingRecommendationsController]
})
export class ListingRecommendationsModule {}
