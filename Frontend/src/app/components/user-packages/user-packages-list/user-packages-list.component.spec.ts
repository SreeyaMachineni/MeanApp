import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPackagesListComponent } from './user-packages-list.component';

describe('UserPackagesListComponent', () => {
  let component: UserPackagesListComponent;
  let fixture: ComponentFixture<UserPackagesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPackagesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPackagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
