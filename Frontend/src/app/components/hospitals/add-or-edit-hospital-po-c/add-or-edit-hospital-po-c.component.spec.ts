import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditHospitalPoCComponent } from './add-or-edit-hospital-po-c.component';

describe('AddOrEditHospitalPoCComponent', () => {
  let component: AddOrEditHospitalPoCComponent;
  let fixture: ComponentFixture<AddOrEditHospitalPoCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditHospitalPoCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditHospitalPoCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
