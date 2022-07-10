import { TestBed } from '@angular/core/testing';

import { GatewayResolver } from './gateway.resolver';

describe('GatewayResolver', () => {
  let resolver: GatewayResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GatewayResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
