import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotCreateComponent } from './hotspot-create.component';

describe('HotspotCreateComponent', () => {
  let component: HotspotCreateComponent;
  let fixture: ComponentFixture<HotspotCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
