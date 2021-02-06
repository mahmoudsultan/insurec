import { Injectable } from '@nestjs/common';
import { Listing } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

import { ListingDao } from './dao/listing.dao';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly listingDao: ListingDao,
              private readonly configService: ConfigService) {}

  listings(
    page: number = 0,
    limit: number = this.configService.get<number>('DEFAULT_PAGE_SIZE')
  ): Promise<Listing[]> {
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    return this.listingDao.listings(page, limit);
  }

  listingById(id: number): Promise<Listing> {
    return this.listingDao.listingById(id);
  }

  create(listingAttributes: CreateListingDto) {
    return this.listingDao.create(listingAttributes);
  }
}
