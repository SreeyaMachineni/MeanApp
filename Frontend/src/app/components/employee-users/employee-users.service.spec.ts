import { TestBed } from '@angular/core/testing';

import { EmployeeUsersService } from './employee-users.service';

describe('EmployeeUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeUsersService = TestBed.get(EmployeeUsersService);
    expect(service).toBeTruthy();
  });
});
