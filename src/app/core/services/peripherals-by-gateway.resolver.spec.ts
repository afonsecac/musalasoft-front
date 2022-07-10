import { TestBed } from '@angular/core/testing';

import { PeripheralsByGatewayResolver } from './peripherals-by-gateway.resolver';

describe('PeripheralsByGatewayResolver', () => {
  let resolver: PeripheralsByGatewayResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PeripheralsByGatewayResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
