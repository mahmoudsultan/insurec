import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import * as _ from 'lodash';

import { PrismaModule } from '@src/prisma/prisma.module';
import { UsersModule } from '@src/users/users.module';

import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { ListingDao } from './dao/listing.dao';
import { MockListingFactory } from './factories/mock-listing.factory';

describe('ListingsController', () => {
  let controller: ListingsController;
  let mockListingFactory: MockListingFactory;
  let listingsService: ListingsService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule, UsersModule],
      providers: [ListingsService, ListingDao],
      controllers: [ListingsController],
    }).compile();

    controller = module.get<ListingsController>(ListingsController);
    listingsService = module.get<ListingsService>(ListingsService);
    configService = module.get<ConfigService>(ConfigService);
    mockListingFactory = new MockListingFactory();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('listings', () => {
    it('returns list of listings', async () => {
      const mockListings = mockListingFactory.getMany(10);

      jest.spyOn(listingsService, 'listings').mockResolvedValueOnce(mockListings);

      const results = await controller.listings({ page: 1, limit: 10 });

      expect(results.length).toEqual(10);
    });

    it('calls listingService with startAfter = null and default limit if non passed', async () => {
      const defaultLimit = configService.get<string>('DEFAULT_PAGE_SIZE');
      const mockListings = mockListingFactory.getMany(10);
      jest.spyOn(listingsService, 'listings').mockResolvedValueOnce(mockListings);

      await controller.listings({});

      expect(listingsService.listings).toHaveBeenCalledWith(null, Number.parseInt(defaultLimit));
    });

    it('calls listingService with passed page and MAX_PAGE_SIZE if passed limit exceeds MAX_PAGE_SIZE', async () => {
      const maxLimit = configService.get<string>('MAX_PAGE_SIZE');
      const mockListings = mockListingFactory.getMany(10);
      jest.spyOn(listingsService, 'listings').mockResolvedValueOnce(mockListings);

      await controller.listings({ startAfter: 0, limit: maxLimit + 1 });

      expect(listingsService.listings).toHaveBeenCalledWith(0, Number.parseInt(maxLimit));
    });

    it('returns only whitelisted fields', async () => {
      const mockListings = mockListingFactory.getMany(10, { nonWhitelistedField: true });
      const whiteListedFields = ['id', 'name', 'description'];

      jest.spyOn(listingsService, 'listings').mockResolvedValueOnce(mockListings);

      const results = await controller.listings({ startAfter: 1, limit: 10 });
      const filteredResults = results.map((result) => _.pick(result, whiteListedFields));

      expect(results).toEqual(filteredResults);
    });
  });
});
