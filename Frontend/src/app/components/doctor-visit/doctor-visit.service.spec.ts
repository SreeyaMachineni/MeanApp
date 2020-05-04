import { TestBed } from '@angular/core/testing';

import { DoctorVisitService } from './doctor-visit.service';

describe('DoctorVisitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DoctorVisitService = TestBed.get(DoctorVisitService);
    expect(service).toBeTruthy();
  });
});
