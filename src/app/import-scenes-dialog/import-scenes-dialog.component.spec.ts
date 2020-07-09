import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportScenesDialogComponent } from './import-scenes-dialog.component';

describe('ImportScenesDialogComponent', () => {
  let component: ImportScenesDialogComponent;
  let fixture: ComponentFixture<ImportScenesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportScenesDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportScenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
