import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';
import { Listing, Prisma, Trait } from '@prisma/client';

import { CreateListingDto } from '../dto/create-listing.dto';
import { UpdateListingDto } from '../dto/update-listing.dto';
import { RecommendedListingDto } from '../dto/recommeded-listing.dto';
import { recommendedListingsForTratisQuery } from '../queries/recommended-listing-for-traits.query';

@Injectable()
export class ListingDao {
  constructor(private readonly prisma: PrismaService) {}

  listings(startAfter?: number, limit?: number): Promise<Listing[]> {
    let config: any = { take: limit, skip: startAfter ? 1 : 0 }
    if (startAfter) {
      config = { ...config, cursor: { id: startAfter } };
    }

    return this.prisma.listing.findMany(config);
  }

  async listingsForTraits(traits: Trait[]): Promise<RecommendedListingDto[]> {
    const matchedListings = await this.prisma.$queryRaw(recommendedListingsForTratisQuery(traits));

    return matchedListings
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
