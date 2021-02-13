import { Test, TestingModule } from '@nestjs/testing';

import { PrismaModule } from '@src/prisma/prisma.module';

import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationDao } from './dao/listing-recommendation.dao';
import { MockListingRecommendationFactory } from './factories/mock-listing-recommendation.factory';

describe('ListingRecommendationsService', () => {
  let listingRecommendationDao: ListingRecommendationDao;
  let service: ListingRecommendationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ListingRecommendationsService, ListingRecommendationDao],
    }).compile();

    listingRecommendationDao = module.get<ListingRecommendationDao>(ListingRecommendationDao);
    service = module.get<ListingRecommendationsService>(ListingRecommendationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listingRecommendations', () => {
    let mockListingRecommendations;

    beforeEach(() => {
      mockListingRecommendations = new MockListingRecommendationFactory().getMany(10);
      jest.spyOn(listingRecommendationDao, 'listingRecommendations').mockResolvedValueOnce(mockListingRecommendations);
    });

    it('calls ListingRecommendationDao.listingRecommendations', async () => {
      const mockPage = 1;
      const mockLimit = 10;

      await service.listingRecommendations(mockPage, mockLimit);

      expect(listingRecommendationDao.listingRecommendations).toHaveBeenCalledWith(mockPage, mockLimit);
    });

    it('returns list of ListingRecommendations', async () => {
      const response = await service.listingRecommendations();

      expect(response).toEqual(mockListingRecommendations);
    });
  });

  describe('listingRecommendationById', () => {
    let mockListingRecommendation;

    beforeEach(() => {
      mockListingRecommendation = new MockListingRecommendationFactory().getOne();

      jest.spyOn(listingRecommendationDao, 'listingRecommendationById').mockResolvedValueOnce(mockListingRecommendation);
    });

    it('calls DAO with correct id', async () => {
      const mockId = 123;
      await service.listingRecommendationById(mockId);

      expect(listingRecommendationDao.listingRecommendationById).toHaveBeenCalledWith(mockId);
    });
  });

  describe('create', () => {
    let mockListingRecommendation;
    let mockListingRecommendationAttr;

    beforeEach(() => {
      mockListingRecommendationAttr = new MockListingRecommendationFactory().attributes();
      mockListingRecommendation = new MockListingRecommendationFactory().getOne(mockListingRecommendationAttr);

      jest.spyOn(listingRecommendationDao, 'create').mockResolvedValueOnce(mockListingRecommendation);
    });

    it('calls DAO with id if provided in parameters', async () => {
      const mockListingId = 422;
      const mockListingRecommendationAttrWithId = { ...mockListingRecommendationAttr, listing: null, listingId: mockListingId };

      const expectedCreateInput = {
        traits: mockListingRecommendationAttr.traits,
        listingId: mockListingId,
      }

      await service.create(mockListingRecommendationAttrWithId);

      expect(listingRecommendationDao.create).toHaveBeenCalledWith(expectedCreateInput);
    });

    it('calls DAO with listing id if listing is provided', async () => {
      const mockListingId = mockListingRecommendationAttr.listing.id;

      const expectedCreateInput = {
        traits: mockListingRecommendationAttr.traits,
        listingId: mockListingId,
      }

      await service.create(mockListingRecommendationAttr);

      expect(listingRecommendationDao.create).toHaveBeenCalledWith(expectedCreateInput);
    });
  });
});
