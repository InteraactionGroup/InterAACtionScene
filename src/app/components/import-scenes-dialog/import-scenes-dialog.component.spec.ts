import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportScenesDialogComponent} from './import-scenes-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';

describe('ImportScenesDialogComponent', () => {
  let component: ImportScenesDialogComponent;
  let fixture: ComponentFixture<ImportScenesDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    // tslint:disable-next-line:no-shadowed-variable
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes']);
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
    fixture = TestBed.createComponent(ImportScenesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it throws specific error if invalid file is passed
  it('submit:: should not update scene if file is invalid', () => {
    component.selectedFile = 'base64';
    component.extensionSelectedFile = 'scene';
    // @ts-ignore
    spyOn(component.jsonValidatorService, 'getCheckedGrid').and.returnValue([]);
    component.submit({ fileSelected: 'base64' });
    expect(component.error).toEqual('Invalid file.');
  });

  // check if it calls specific service method if passing required params
  it('submit:: should update scene and close dialog', () => {
    component.selectedFile = '{"file": "abc"}';
    component.extensionSelectedFile = 'scene';
    // @ts-ignore
    spyOn(component.jsonValidatorService, 'getCheckedGrid').and.returnValue([]);
    component.submit({ fileSelected: 'base64' });
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });
});
