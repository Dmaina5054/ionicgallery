import { TestBed } from '@angular/core/testing';

import { NetworklistenerService } from './networklistener.service';

describe('NetworklistenerService', () => {
  let service: NetworklistenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworklistenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
