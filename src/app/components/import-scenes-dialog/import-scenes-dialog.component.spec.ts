import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ImportScenesDialogComponent} from './import-scenes-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {ScenesService} from 'src/app/services/scenes.service';

describe('ImportScenesDialogComponent', () => {
  let component: ImportScenesDialogComponent;
  let fixture: ComponentFixture<ImportScenesDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ImportScenesDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
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

  // spy upon the FileReader and return the object which is used in the function
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

  // check import good file
  it('import:: should import our file farm.scene',() => {
    let scene;
    const req = new XMLHttpRequest();

    req.open('GET', '../../../assets/share/farm.scene', false);
    req.send(null);

    scene = component.jsonValidatorService.getCheckedGrid(JSON.parse(req.responseText));
    expect(scene).not.toBeNull();
  });

  // check import wrong file
  it('import:: should not import our file falseFarm.scene', () => {
    let scene;
    const req = new XMLHttpRequest();

    req.open('GET', '../../../assets/share/falseFarm.scene', false);
    req.send(null);

    scene = component.jsonValidatorService.getCheckedGrid(JSON.parse(req.responseText));
    expect(scene).toBeNull();
  });

  /*// get zip file
  it('import zip:: should import our file farm.zip',fakeAsync(async () => {
    const req = new XMLHttpRequest();
    req.responseType = "blob";
    req.open('GET', '../../../assets/share/farm.zip', false);
    req.send(null);

    setTimeout(async () => {
      const request = req.response;
      const zipFolder = new JSZip();
      const zip = await zipFolder.loadAsync(request);
      const isSceneFile = (name) => name.toLowerCase().endsWith(".scene");
      const fileInZip = Object.keys(zip.files);
      const sceneFile = fileInZip.find(isSceneFile)
      const sceneData = await zip.file(sceneFile).async("string");
      this.valueRequest = this.jsonValidatorService.getCheckedGrid(JSON.parse(sceneData));
    }, 5000);
  }));*/

});
