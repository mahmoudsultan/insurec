import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ListingsModule } from './listings/listings.module';
import { ListingRecommendationsModule } from './listing-recommendations/listing-recommendations.module';
import { UsersModule } from './users/users.module';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

@Module({
  imports: [PrismaModule, ListingsModule, ConfigModule.forRoot(),
            ListingRecommendationsModule, UsersModule, QuestionnaireModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
