import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ListingsModule } from './listings/listings.module';
import { ListingRecommendationsModule } from './listing-recommendations/listing-recommendations.module';
import { UsersModule } from './users/users.module';
import { QuesModule } from './ques/ques.module';

@Module({
  imports: [PrismaModule, ListingsModule, ConfigModule.forRoot(), ListingRecommendationsModule, UsersModule, QuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
