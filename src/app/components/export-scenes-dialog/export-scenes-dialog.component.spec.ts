import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ExportScenesDialogComponent } from './export-scenes-dialog.component';
import {ImportScenesDialogComponent} from '../import-scenes-dialog/import-scenes-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';

describe('ExportScenesDialogComponent', () => {
  let component: ExportScenesDialogComponent;
  let fixture: ComponentFixture<ExportScenesDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;
  let sceneServiceMock: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    // tslint:disable-next-line:no-shadowed-variable
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    sceneServiceMock = jasmine.createSpyObj('ScenesService', ['getScenes']);
    TestBed.configureTestingModule({
      declarations: [ImportScenesDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot(), RouterTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: dialogRef
        },
        { provide: ScenesService, useValue: sceneServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportScenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it calls specific methods and closes the dialog
  it('submit:: should export scenes and close dialog', fakeAsync(() => {
    sceneService.getScenes.and.returnValue('{ "id": 1 }' as any);
    component.submit({ value: { name: 'test' } });
    tick(10);
    expect(dialogRef.close).toHaveBeenCalled();
    spyOnProperty(window, 'navigator', 'get').and.returnValue({msSaveOrOpenBlob: () => {}} as any);
    component.submit({ value: { name: 'test' } });
    expect(dialogRef.close).toHaveBeenCalled();
  }));
});
