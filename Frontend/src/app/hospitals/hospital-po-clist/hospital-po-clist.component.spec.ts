import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalPoCListComponent } from './hospital-po-clist.component';

describe('HospitalPoCListComponent', () => {
  let component: HospitalPoCListComponent;
  let fixture: ComponentFixture<HospitalPoCListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalPoCListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalPoCListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
