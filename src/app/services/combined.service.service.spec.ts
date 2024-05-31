import { TestBed } from '@angular/core/testing';

import { CombinedServiceService } from './combined.service.service';

describe('CombinedServiceService', () => {
  let service: CombinedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CombinedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
