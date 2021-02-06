import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '@src/prisma/prisma.module';

import { ListingsService } from './listings.service';
import { ListingDao } from './dao/listing.dao';
import { ListingsController } from './listings.controller';


@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [ListingsService, ListingDao],
  controllers: [ListingsController],
  exports: [ListingsService],
})
export class ListingsModule {}
