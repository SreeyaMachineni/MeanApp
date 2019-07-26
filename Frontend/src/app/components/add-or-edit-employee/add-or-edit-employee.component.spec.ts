import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditEmployeeComponent } from './add-or-edit-employee.component';

describe('AddOrEditEmployeeComponent', () => {
  let component: AddOrEditEmployeeComponent;
  let fixture: ComponentFixture<AddOrEditEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
