import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as _ from 'lodash';

import { ListingsService } from './listings.service';
import { ListingViewBlueprint, ListingView } from './views/listing.view';
import { CreateListingDto } from './dto/create-listing.dto';

@Controller()
export class ListingsController {
  constructor(private readonly listingService: ListingsService,
              private readonly configService: ConfigService) {}

  @Get('users/:id/recommendations')
  async userRecommendations(@Param('id') userId) {
    return this.listingService.listingsForTraits(Number.parseInt(userId));
  }

  @Get('listings')
  async listings(@Query() query): Promise<ListingView[]> {
    let { page = 0, limit = this.configService.get<number>('DEFAULT_PAGE_SIZE') } = query;
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    const listings = await this.listingService.listings(page, limit);

    return ListingViewBlueprint.render(listings);
  }

  @Post('listings')
  async create(@Body() bodyParams: CreateListingDto): Promise<ListingView> {
    const filteredListingsAttributes = this.filterListingAttributes(bodyParams);
    const createdListing = await this.listingService.create(filteredListingsAttributes);

    return ListingViewBlueprint.render(createdListing);
  }

  private filterListingAttributes(attributes) {
    return _.pick(attributes, ['id', 'name', 'description']);
  }
}
