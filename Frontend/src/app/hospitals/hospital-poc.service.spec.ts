import { TestBed } from '@angular/core/testing';

import { HospitalPocService } from './hospital-poc.service';

describe('HospitalPocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalPocService = TestBed.get(HospitalPocService);
    expect(service).toBeTruthy();
  });
});
