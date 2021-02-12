import { Test, TestingModule } from '@nestjs/testing';
import { ListingRecommendationsService } from './listing-recommendations.service';

describe('ListingRecommendationsService', () => {
  let service: ListingRecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListingRecommendationsService],
    }).compile();

    service = module.get<ListingRecommendationsService>(ListingRecommendationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
