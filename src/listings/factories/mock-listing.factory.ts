import * as _ from 'lodash';
import { Listing } from '@prisma/client';
import { CreateListingDto } from '../dto/create-listing.dto';

export class MockListingFactory {
  private default(overrideFields?: Record<string, unknown>): Listing {
    return {
      id: Math.random() * 10,
      name: 'Insurence',
      description: 'Insurence Description.',
      ...overrideFields,
    }
  }

  private defaultAttributes(overrideFields?: Record<string, unknown>): CreateListingDto {
    return {
      name: 'New Insurence Listing',
      description: 'New Insurence listing description',
      ...overrideFields,
    }
  }

  getOne(overrideFields?: Record<string, unknown>): Listing {
    return { ...this.default(), ...overrideFields };
  }

  getMany(count: number, overrideFields?: Record<string, unknown>): Listing[] {
    const mockListing = this.getOne(overrideFields);

    return _.times(count, () => ({ ...mockListing }));
  }

  attributes(overrideFields?: Record<string, unknown>): CreateListingDto {
    return { ...this.defaultAttributes(), ...overrideFields };
  }
}
