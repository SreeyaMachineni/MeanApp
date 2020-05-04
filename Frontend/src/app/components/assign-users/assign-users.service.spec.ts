import { TestBed } from '@angular/core/testing';

import { AssignUsersService } from './assign-users.service';

describe('AssignUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssignUsersService = TestBed.get(AssignUsersService);
    expect(service).toBeTruthy();
  });
});
