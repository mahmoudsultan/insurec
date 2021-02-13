import { Controller, Query, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { pick } from 'lodash';

import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationViewBlueprint, ListingRecommendationView } from './views/ListingRecommendation.view';
import { CreateListingRecommendationDto } from './dto/create-listing-recommendation.dto';
import { ApiImplicitQuery, ApiOkResponse, ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';

@Controller('recommendations')
@ApiUseTags('Listing Recommendations')
export class ListingRecommendationsController {
  constructor(private readonly configService: ConfigService,
              private readonly listingRecommendationService: ListingRecommendationsService) {}

  @Get()
  @ApiImplicitQuery({ name: 'startAfter', required: false })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiOkResponse({ type: [ListingRecommendationView] })
  async listingRecommendations(@Query() query: { startAfter?: unknown, limit: unknown }): Promise<ListingRecommendationView[]> {
    let { startAfter = null, limit = this.configService.get<number>('DEFAULT_PAGE_SIZE') } = query;
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    startAfter = startAfter && Number.parseInt(startAfter as string);
    limit = Number.parseInt(limit as string);

    const listingRecommendations = await this.listingRecommendationService.listingRecommendations(startAfter as number, limit as number);

    return ListingRecommendationViewBlueprint.render(listingRecommendations);
  }

  @Post()
  @ApiOkResponse({ type: ListingRecommendationView })
  async create(@Body() bodyParams: CreateListingRecommendationDto): Promise<ListingRecommendationView> {
    const filteredAttributes = this.filterListingRecommendationAttributes(bodyParams);

    const createdListingRecommendation = await this.listingRecommendationService.create(filteredAttributes);

    return ListingRecommendationViewBlueprint.render(createdListingRecommendation);
  }

  @Delete('/:id')
  @ApiImplicitParam({ name: 'id', required: true })
  @ApiOkResponse({ type: ListingRecommendationView })
  async delete(@Param('id') listingRecommmendationId: number): Promise<ListingRecommendationViewBlueprint> {
    const deletedListingRecommendation = await this.listingRecommendationService.delete(listingRecommmendationId);

    return ListingRecommendationViewBlueprint.render(deletedListingRecommendation);
  }

  private filterListingRecommendationAttributes(attributes) {
    return pick(attributes, ['traits', 'listing', 'listingId']);
  }
}
