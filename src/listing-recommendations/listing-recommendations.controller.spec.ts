import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { ListingRecommendationsController } from './listing-recommendations.controller';
import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationDao } from './dao/listing-recommendation.dao';

describe('ListingRecommendationsController', () => {
  let controller: ListingRecommendationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      providers: [ListingRecommendationsService, ListingRecommendationDao],
      controllers: [ListingRecommendationsController],
    }).compile();

    controller = module.get<ListingRecommendationsController>(ListingRecommendationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
