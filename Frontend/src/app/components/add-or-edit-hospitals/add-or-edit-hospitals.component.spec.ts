import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditHospitalsComponent } from './add-or-edit-hospitals.component';

describe('AddOrEditHospitalsComponent', () => {
  let component: AddOrEditHospitalsComponent;
  let fixture: ComponentFixture<AddOrEditHospitalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditHospitalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditHospitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
