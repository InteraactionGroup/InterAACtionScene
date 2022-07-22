import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportScenesDialogComponent} from './import-scenes-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ScenesService} from 'src/app/services/scenes.service';
import {readFile} from "fs";
import * as http from "http";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";

describe('ImportScenesDialogComponent', () => {
  let component: ImportScenesDialogComponent;
  let fixture: ComponentFixture<ImportScenesDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;
  const data = require('../../../assets/share/farm.scene');

  beforeEach(async(() => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes']);
    TestBed.configureTestingModule({
      declarations: [ImportScenesDialogComponent],
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot(), RouterTestingModule, HttpClientModule],
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
    component.selectedFile = data;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it throws specific error if we pass invalid file
  it('submit:: should not update scene if file is invalid', () => {
    component.selectedFile = 'base64';
    component.extensionSelectedFile = 'scene';
    // @ts-ignore
    spyOn(component.jsonValidatorService, 'getCheckedGrid').and.returnValue([]);
    component.submit({ fileSelected: 'base64' });
    expect(component.error).toEqual('Invalid file.');
  });

  // check if it calls specific service method if required params are passed
  it('submit:: should update scene and close dialog', () => {
    component.selectedFile = '{"file": "abc"}';
    component.extensionSelectedFile = 'scene';
    // @ts-ignore
    spyOn(component.jsonValidatorService, 'getCheckedGrid').and.returnValue([]);
    component.submit({ fileSelected: 'base64' });
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(dialogRef.close).toHaveBeenCalled();
  });

  // check if it throws specific error if we pass invalid file
  it('submit:: should show error if file is other then .scene', () => {
    component.selectedFile = '{"file": "abc"}';
    component.extensionSelectedFile = 'png';
    component.submit({ fileSelected: 'base64' });
    expect(sceneService.updateScenes).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
    expect(component.error).toEqual('Invalid file, only .scene file !');
  });

  // check if it throws specific error if we return invalid response
  it('submit:: should not do anything if scene response is invalid', () => {
    component.selectedFile = '{"file": "abc"}';
    component.extensionSelectedFile = 'scene';
    // @ts-ignore
    spyOn(component.jsonValidatorService, 'getCheckedGrid').and.returnValue(null);
    component.submit({ fileSelected: 'base64' });
    expect(sceneService.updateScenes).not.toHaveBeenCalled();
    expect(dialogRef.close).not.toHaveBeenCalled();
  });

  // function should set file from the passed event
  it('onFileSelected:: should set selected file from event', () => {
    const blob = new Blob([""], { type: "text/html" });
    blob["lastModifiedDate"] = "";
    blob["name"] = "filename";
    const file = <File>blob;
    const fileList: FileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    component.onFileSelected({target: {files: fileList}});
  });

  // spy upon the FileReader and returnd the object which is used in the function
  // at last just check if FileReader instance is getting created or not
  it('onFileSelected:: should show error if file reader fails', () => {
    const blob = new Blob([""], { type: "text/html" });
    blob["lastModifiedDate"] = "";
    blob["name"] = "filename";
    const file = <File>blob;
    const fileList: FileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    spyOn(window, 'FileReader').and.returnValue({
      onload: function() {},
      readAsText : function() {
        return true;
      },
      onerror: () => {}
    } as any);
    component.onFileSelected({target: {files: fileList}});
    // @ts-ignore
    window.FileReader().onerror('error');
    expect(window.FileReader).toHaveBeenCalled();
  });

  // check import our file
  it('import:: should import our file.scene', () => {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var data = component.http.get("../../../assets/share/farm.scene", {'headers': headers}).toPromise();
    var blobData = new Blob([JSON.stringify(data)], {type:'application/json'});

    const reader = new FileReader();
    reader.readAsText(blobData, 'UTF-8');
    reader.onload = () => {
      this.selectedFile = reader.result;
      expect(component.jsonValidatorService.getCheckedGrid(JSON.parse(this.selectedFile))).toBeTruthy();
    };
  });
});
