import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotDisplayComponent } from './hotspot-display.component';

describe('HotspotDisplayComponent', () => {
  let component: HotspotDisplayComponent;
  let fixture: ComponentFixture<HotspotDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
