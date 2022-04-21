import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySiteASFRComponent } from './display-site-asfr.component';

describe('DisplaySiteASFRComponent', () => {
  let component: DisplaySiteASFRComponent;
  let fixture: ComponentFixture<DisplaySiteASFRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySiteASFRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySiteASFRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
