import * as _ from 'lodash';

export class MockListingFactory {
  private default(overrideFields?: Object) {
    return {
      id: Math.random() * 10,
      name: 'Insurence',
      description: 'Insurence Description.',
      ...overrideFields,
    }
  }

  private defaultAttributes(overrideFields?: Object) {
    return {
      name: 'New Insurence Listing',
      description: 'New Insurence listing description',
      ...overrideFields,
    }
  }

  getOne(overrideFields?: Object) {
    return { ...this.default(), ...overrideFields };
  }

  getMany(count: number, overrideFields?: Object) {
    const mockListing = this.getOne(overrideFields);

    return _.times(count, () => ({ ...mockListing }));
  }

  attributes(overrideFields?: Object) {
    return { ...this.defaultAttributes(), ...overrideFields };
  }
}
