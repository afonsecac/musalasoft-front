import { TestBed } from '@angular/core/testing';

import { PeripheralsResolver } from './peripherals.resolver';

describe('PeripheralsResolver', () => {
  let resolver: PeripheralsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PeripheralsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
