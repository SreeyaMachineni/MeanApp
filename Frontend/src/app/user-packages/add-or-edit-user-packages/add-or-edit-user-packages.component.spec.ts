import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditUserPackagesComponent } from './add-or-edit-user-packages.component';

describe('AddOrEditUserPackagesComponent', () => {
  let component: AddOrEditUserPackagesComponent;
  let fixture: ComponentFixture<AddOrEditUserPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditUserPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditUserPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
