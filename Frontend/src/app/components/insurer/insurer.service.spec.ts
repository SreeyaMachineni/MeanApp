import { TestBed } from '@angular/core/testing';

import { InsurerService } from './insurer.service';

describe('InsurerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsurerService = TestBed.get(InsurerService);
    expect(service).toBeTruthy();
  });
});
