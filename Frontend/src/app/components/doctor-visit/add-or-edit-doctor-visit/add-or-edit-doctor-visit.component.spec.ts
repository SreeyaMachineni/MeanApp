import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditDoctorVisitComponent } from './add-or-edit-doctor-visit.component';

describe('AddOrEditDoctorVisitComponent', () => {
  let component: AddOrEditDoctorVisitComponent;
  let fixture: ComponentFixture<AddOrEditDoctorVisitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditDoctorVisitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditDoctorVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
