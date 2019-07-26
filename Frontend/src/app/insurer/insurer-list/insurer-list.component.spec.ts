import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurerListComponent } from './insurer-list.component';

describe('InsurerListComponent', () => {
  let component: InsurerListComponent;
  let fixture: ComponentFixture<InsurerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
