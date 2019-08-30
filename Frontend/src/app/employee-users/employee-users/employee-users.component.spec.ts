import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeUsersComponent } from './employee-users.component';

describe('EmployeeUsersComponent', () => {
  let component: EmployeeUsersComponent;
  let fixture: ComponentFixture<EmployeeUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
