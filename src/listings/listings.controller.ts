import { Controller, Get, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ListingsService } from './listings.service';
import { ListingViewBlueprint, ListingView } from './views/listing.view';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingService: ListingsService,
              private readonly configService: ConfigService) {}

  @Get()
  async listings(@Query() query): Promise<ListingView[]> {
    let { page = 0, limit = this.configService.get<number>('DEFAULT_PAGE_SIZE') } = query;
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    const listings = await this.listingService.listings(page, limit);

    return ListingViewBlueprint.render(listings);
  }
}
