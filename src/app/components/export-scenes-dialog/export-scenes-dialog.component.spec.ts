import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportScenesDialogComponent } from './export-scenes-dialog.component';

describe('ExportScenesDialogComponent', () => {
  let component: ExportScenesDialogComponent;
  let fixture: ComponentFixture<ExportScenesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportScenesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportScenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
