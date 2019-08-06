import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditUserClaimsComponent } from './add-or-edit-user-claims.component';

describe('AddOrEditUserClaimsComponent', () => {
  let component: AddOrEditUserClaimsComponent;
  let fixture: ComponentFixture<AddOrEditUserClaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrEditUserClaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditUserClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
