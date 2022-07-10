import { TestBed } from '@angular/core/testing';

import { MusalaSoftInterceptor } from './musala-soft.interceptor';

describe('MusalaSoftInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MusalaSoftInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MusalaSoftInterceptor = TestBed.inject(MusalaSoftInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
