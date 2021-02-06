import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Listing, Prisma } from '@prisma/client';

import { CreateListingDto } from '../dto/create-listing.dto';
import { UpdateListingDto } from '../dto/update-listing.dto';

@Injectable()
export class ListingDao {
  constructor(private readonly prisma: PrismaService) {}

  listings(page?: number, limit?: number): Promise<Listing[]> {
    let config = {}
    if (page) {
      if (!limit) {
        throw new Error('LIMIT MUST BE PROVIDED IF PAGE IS');
      }

      config = { ...config, take: limit, skip: (page || 1) * limit };
    }

    return this.prisma.listing.findMany(config);
  }

  listingById(id: number): Promise<Listing> {
    return this.listing({ id });
  }

  listing(listingWhereUniqInput: Prisma.ListingWhereUniqueInput) {
    return this.prisma.listing.findUnique({ where: listingWhereUniqInput });
  }

  create(listing: CreateListingDto): Promise<Listing> {
    return this.prisma.listing.create({ data: listing });
  }

  update(id: number, listing: UpdateListingDto): Promise<Listing> {
    return this.prisma.listing.update({ data: listing, where: { id } });
  }

  delete(id: number): Promise<Listing> {
    return this.prisma.listing.delete({ where: { id } })
  }
}
