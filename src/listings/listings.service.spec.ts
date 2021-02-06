import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { ListingsService } from './listings.service';
import { ListingDao } from './dao/listing.dao';
import { MockListingFactory } from './factories/mock-listing.factory';
import { CreateListingDto } from './dto/create-listing.dto';

describe('ListingsService', () => {
  let service: ListingsService;
  let listingDao: ListingDao;
  let configService: ConfigService;
  let mockListingFactory: MockListingFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, ConfigModule],
      providers: [ListingsService, ListingDao],
    }).compile();

    service = module.get<ListingsService>(ListingsService);
    listingDao = module.get<ListingDao>(ListingDao);
    configService = module.get<ConfigService>(ConfigService);
    mockListingFactory = new MockListingFactory();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('.listings', () => {
    it('calls listingDao with passed page and limit', async () => {
      const mockPage = 1;
      const mockLimit = 100;

      const mockListings = mockListingFactory.getMany(10);
      jest.spyOn(listingDao, 'listings').mockResolvedValueOnce(mockListings);

      await service.listings(mockPage, mockLimit);

      expect(listingDao.listings).toHaveBeenCalledWith(mockPage, mockLimit);
    });

    it('calls listingDao with page = 0 and default limit if non passed', async () => {
      const defaultLimit = configService.get<number>('DEFAULT_PAGE_SIZE');
      const mockListings = mockListingFactory.getMany(10);
      jest.spyOn(listingDao, 'listings').mockResolvedValueOnce(mockListings);

      await service.listings();

      expect(listingDao.listings).toHaveBeenCalledWith(0, defaultLimit);
    });

    it('calls listingDao with passed page and MAX_PAGE_SIZE if passed limit exceeds MAX_PAGE_SIZE', async () => {
      const maxLimit = configService.get<number>('MAX_PAGE_SIZE');
      const mockListings = mockListingFactory.getMany(10);
      jest.spyOn(listingDao, 'listings').mockResolvedValueOnce(mockListings);

      await service.listings(0, maxLimit + 1);

      expect(listingDao.listings).toHaveBeenCalledWith(0, maxLimit);
    });
  });

  describe('.listingById', () => {
    it('calls listingDao with correct id', async () => {
      const mockId = 123;
      const mockListing = mockListingFactory.getOne();
      jest.spyOn(listingDao, 'listingById').mockResolvedValue(mockListing);

      await service.listingById(mockId);

      expect(listingDao.listingById).toHaveBeenCalledWith(mockId);
    });

    it('returns a Listing model', async () => {
      const mockId = 123;
      const mockListing = mockListingFactory.getOne();
      jest.spyOn(listingDao, 'listingById').mockResolvedValue(mockListing);

      const listing = await service.listingById(mockId);

      expect(listing).toEqual(mockListing);
    });
  });

  describe('.create', () => {
    it('calls listingDao.create with correct params', async () => {
      const newListingParams = mockListingFactory.attributes() as CreateListingDto;
      const mockListing = mockListingFactory.getOne(newListingParams);

      jest.spyOn(listingDao, 'create').mockResolvedValueOnce(mockListing);

      await service.create(newListingParams);

      expect(listingDao.create).toHaveBeenCalledWith(newListingParams);
    });

    it('returns created listing', async () => {
      const newListingParams = mockListingFactory.attributes() as CreateListingDto;
      const mockListing = mockListingFactory.getOne(newListingParams);

      jest.spyOn(listingDao, 'create').mockResolvedValueOnce(mockListing);

      const createdListing = await service.create(newListingParams);

      expect(createdListing).toEqual(mockListing);
    });
  });
});
