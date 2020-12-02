import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotspotDeleteDialogComponent } from './hotspot-delete-dialog.component';

describe('HotspotDeleteDialogComponent', () => {
  let component: HotspotDeleteDialogComponent;
  let fixture: ComponentFixture<HotspotDeleteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotspotDeleteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
