import { Module } from '@nestjs/common';
import { PrismaModule } from '@src/prisma/prisma.module';
import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationsController } from './listing-recommendations.controller';

@Module({
  imports: [PrismaModule],
  providers: [ListingRecommendationsService],
  controllers: [ListingRecommendationsController]
})
export class ListingRecommendationsModule {}
