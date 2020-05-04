import { TestBed } from '@angular/core/testing';

import { UserPackagesService } from './user-packages.service';

describe('UserPackagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPackagesService = TestBed.get(UserPackagesService);
    expect(service).toBeTruthy();
  });
});
