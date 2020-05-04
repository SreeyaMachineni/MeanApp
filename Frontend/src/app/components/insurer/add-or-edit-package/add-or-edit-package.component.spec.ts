import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPackageComponent } from './add-or-edit-package.component';

describe('AddOrEditPackageComponent', () => {
  let component: AddOrEditPackageComponent;
  let fixture: ComponentFixture<AddOrEditPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
