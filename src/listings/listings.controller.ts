import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Listing } from '@prisma/client';

import * as _ from 'lodash';

import { ListingsService } from './listings.service';
import { ListingViewBlueprint, ListingView } from './views/listing.view';
import { CreateListingDto } from './dto/create-listing.dto';
import { ApiOkResponse, ApiImplicitParam, ApiCreatedResponse, ApiUseTags, ApiImplicitQuery } from '@nestjs/swagger';

@Controller()
@ApiUseTags('Listings')
export class ListingsController {
  constructor(private readonly listingService: ListingsService,
              private readonly configService: ConfigService) {}

  @Get('users/:id/recommendations')
  @ApiImplicitParam({ name: 'id', required: true, description: 'ID of user to return recommendations for' })
  @ApiOkResponse({ type: ListingView })
  async userRecommendations(@Param('id') userId: string | number): Promise<Listing[]> {
    return this.listingService.listingsForTraits(Number.parseInt(userId as string));
  }

  @Get('listings')
  @ApiImplicitQuery({ name: 'startAfter', description: 'ID of listing to start page after', required: false })
  @ApiImplicitQuery({ name: 'limit', description: 'Page size to return', required: false })
  @ApiOkResponse({ type: [ListingView] })
  async listings(@Query() query: { startAfter?: number | string, limit?: number | string }): Promise<ListingView[]> {
    let { startAfter = null, limit = this.configService.get<number>('DEFAULT_PAGE_SIZE') } = query;
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    startAfter = startAfter && Number.parseInt(startAfter as string)
    limit = Number.parseInt(limit as string)

    const listings = await this.listingService.listings(startAfter, limit);

    return ListingViewBlueprint.render(listings);
  }

  @Post('listings')
  @ApiCreatedResponse({ type: ListingView })
  async create(@Body() bodyParams: CreateListingDto): Promise<ListingView> {
    const filteredListingsAttributes = this.filterListingAttributes(bodyParams);
    const createdListing = await this.listingService.create(filteredListingsAttributes);

    return ListingViewBlueprint.render(createdListing);
  }

  private filterListingAttributes(attributes) {
    return _.pick(attributes, ['id', 'name', 'description']);
  }
}
