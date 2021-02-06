import { Injectable } from '@nestjs/common';
import { Listing } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

import { ListingDao } from './dao/listing.dao';
import { CreateListingDto } from './dto/create-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly listingDao: ListingDao,
              private readonly configService: ConfigService) {}

  listings(page?: number, limit?: number): Promise<Listing[]> {
    return this.listingDao.listings(page, limit);
  }

  listingById(id: number): Promise<Listing> {
    return this.listingDao.listingById(id);
  }

  create(listingAttributes: CreateListingDto) {
    return this.listingDao.create(listingAttributes);
  }
}
