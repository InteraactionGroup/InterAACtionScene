import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AddImageDialogComponent} from './add-image-dialog.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';

describe('AddImageDialogComponent', () => {
  let component: AddImageDialogComponent;
  let fixture: ComponentFixture<AddImageDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<AddImageDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    // tslint:disable-next-line:no-shadowed-variable
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['addImage']);
    TestBed.configureTestingModule({
      declarations: [AddImageDialogComponent],
      // tslint:disable-next-line:max-line-length
      imports: [MatDialogModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule, TranslateModule.forRoot(), RouterTestingModule],
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
    fixture = TestBed.createComponent(AddImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<AddImageDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // setup blob and set to selectedFile and check if it calls the service method
  it('submit:: should add image and close the dialog', () => {
    const blob = new Blob([''], { type: 'image/jpeg' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const file = blob as File;
    component.selectedFile = file;

    component.submit({value: {imagename: 'test'}});
    expect(sceneService.addImage).toHaveBeenCalledWith(component.selectedFile, component.sceneNumber, 'test');
    expect(dialogRef.close).toHaveBeenCalled();
  });

  // made selectedFile null and check if it does not call the service method
  it('submit:: should not add image if selected file is not present', () => {
    component.selectedFile = null;
    component.submit({value: {imagename: 'test'}});
    expect(sceneService.addImage).not.toHaveBeenCalledWith(component.selectedFile, component.sceneNumber, 'test');
    expect(dialogRef.close).toHaveBeenCalled();
  });

  // function should set file from the passed event
  it('onFileSelected:: should set selected file from event', () => {
    const blob = new Blob([''], { type: 'text/html' });
    blob['lastModifiedDate'] = '';
    blob['name'] = 'filename';
    const file = blob as File;
    const fileList: FileList = {
      0: file,
      1: file,
      length: 2,
      item: (index: number) => file
    };
    component.onFileSelected({target: {files: fileList}});
  });
});
