import { TestBed } from '@angular/core/testing';

import { BackpopService } from './backpop.service';

describe('BackpopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackpopService = TestBed.get(BackpopService);
    expect(service).toBeTruthy();
  });
});
