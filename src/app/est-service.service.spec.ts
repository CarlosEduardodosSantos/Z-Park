import { TestBed } from '@angular/core/testing';

import { EstServiceService } from './est-service.service';

describe('EstServiceService', () => {
  let service: EstServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
