import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportScenesDialogComponent } from './export-scenes-dialog.component';
import {ImportScenesDialogComponent} from "../import-scenes-dialog/import-scenes-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TranslateModule} from "@ngx-translate/core";
import {RouterTestingModule} from '@angular/router/testing';

describe('ExportScenesDialogComponent', () => {
  let component: ExportScenesDialogComponent;
  let fixture: ComponentFixture<ExportScenesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImportScenesDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot(),RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
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
