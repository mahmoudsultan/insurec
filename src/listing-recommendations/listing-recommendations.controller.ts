import { Controller, Query, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { pick } from 'lodash';

import { ListingRecommendationsService } from './listing-recommendations.service';
import { ListingRecommendationViewBlueprint, ListingRecommendationView } from './views/ListingRecommendation.view';
import { CreateListingRecommendationDto } from './dto/create-listing-recommendation.dto';

@Controller('listing-recommendations')
export class ListingRecommendationsController {
  constructor(private readonly configService: ConfigService,
              private readonly listingRecommendationService: ListingRecommendationsService) {}

  @Get()
  async listingRecommendations(@Query() query): Promise<ListingRecommendationView[]> {
    let { page = 0, limit = this.configService.get<number>('DEFAULT_PAGE_SIZE') } = query;
    limit = limit > this.configService.get<number>('MAX_PAGE_SIZE') ? 
              this.configService.get<number>('MAX_PAGE_SIZE') :
              limit;

    const listingRecommendations = await this.listingRecommendationService.listingRecommendations(page, limit);

    return ListingRecommendationViewBlueprint.render(listingRecommendations);
  }

  @Post()
  async create(@Body() bodyParams: CreateListingRecommendationDto): Promise<ListingRecommendationView> {
    const filteredAttributes = this.filterListingRecommendationAttributes(bodyParams);

    const createdListingRecommendation = await this.listingRecommendationService.create(filteredAttributes);

    return ListingRecommendationViewBlueprint.render(createdListingRecommendation);
  }

  @Delete('/:id/')
  async delete(@Param('id') listingRecommmendationId: number): Promise<ListingRecommendationViewBlueprint> {
    const deletedListingRecommendation = await this.listingRecommendationService.delete(listingRecommmendationId);

    return ListingRecommendationViewBlueprint.render(deletedListingRecommendation);
  }

  private filterListingRecommendationAttributes(attributes) {
    return pick(attributes, ['traits', 'listing', 'listingId']);
  }
}
