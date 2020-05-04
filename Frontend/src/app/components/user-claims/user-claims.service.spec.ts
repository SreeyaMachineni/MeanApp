import { TestBed } from '@angular/core/testing';

import { UserClaimsService } from './user-claims.service';

describe('UserClaimsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserClaimsService = TestBed.get(UserClaimsService);
    expect(service).toBeTruthy();
  });
});
