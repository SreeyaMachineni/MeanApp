import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditInsurerComponent } from './add-or-edit-insurer.component';

describe('AddOrEditInsurerComponent', () => {
  let component: AddOrEditInsurerComponent;
  let fixture: ComponentFixture<AddOrEditInsurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditInsurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditInsurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
