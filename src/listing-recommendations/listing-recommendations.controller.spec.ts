import { Test, TestingModule } from '@nestjs/testing';
import { ListingRecommendationsController } from './listing-recommendations.controller';

describe('ListingRecommendationsController', () => {
  let controller: ListingRecommendationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListingRecommendationsController],
    }).compile();

    controller = module.get<ListingRecommendationsController>(ListingRecommendationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
