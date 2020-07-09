import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotCreateDialogComponent } from './hotspot-create-dialog.component';

describe('HotspotCreateDialogComponent', () => {
  let component: HotspotCreateDialogComponent;
  let fixture: ComponentFixture<HotspotCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
