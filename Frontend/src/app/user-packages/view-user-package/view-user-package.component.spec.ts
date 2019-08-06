import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserPackageComponent } from './view-user-package.component';

describe('ViewUserPackageComponent', () => {
  let component: ViewUserPackageComponent;
  let fixture: ComponentFixture<ViewUserPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUserPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
