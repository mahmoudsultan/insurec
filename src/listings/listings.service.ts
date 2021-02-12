import { Injectable } from '@nestjs/common';
import { Listing } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from '@src/users/repository/user.repository';

import { ListingDao } from './dao/listing.dao';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(private readonly listingDao: ListingDao,
              private readonly usersRepository: UserRepository,
              private readonly configService: ConfigService) {}

  listings(page?: number, limit?: number): Promise<Listing[]> {
    return this.listingDao.listings(page, limit);
  }

  async listingsForTraits(userId: number) {
    const userWithTraits = await this.usersRepository.userWithTraits(userId);

    if (!userWithTraits.traits || !userWithTraits.traits.length) {
      return [];
    }

    return this.listingDao.listingsForTraits(userWithTraits.traits);
  }

  listingById(id: number): Promise<Listing> {
    return this.listingDao.listingById(id);
  }

  create(listingAttributes: CreateListingDto): Promise<Listing> {
    return this.listingDao.create(listingAttributes);
  }

  update(id: number, attribures: UpdateListingDto): Promise<Listing> {
    return this.listingDao.update(id, attribures);
  }

  delete(id: number): Promise<Listing> {
    return this.listingDao.delete(id);
  }
}
