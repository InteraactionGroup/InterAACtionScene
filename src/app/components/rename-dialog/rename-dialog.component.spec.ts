import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RenameDialogComponent} from './rename-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";
import {ScenesService} from '../../services/scenes.service';

describe('RenameDialogComponent', () => {
  let component: RenameDialogComponent;
  let fixture: ComponentFixture<RenameDialogComponent>;
  let scenesService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const scenesServiceMock = jasmine.createSpyObj('ScenesService', ['renameImage', 'renameScene']);
    TestBed.configureTestingModule({
      declarations: [RenameDialogComponent]
      ,
      imports: [FormsModule, ReactiveFormsModule, MatDialogModule, TranslateModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close'])
        },
        {provide: ScenesService, useValue: scenesServiceMock}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenameDialogComponent);
    component = fixture.componentInstance;
    component.selectedScene = 0;
    component.selectedImage = 0;
    scenesService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
    scenesService.SCENES = [{name: 'xyz', images: [{name: 'uvw'}]}] as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it calls specific service method based on the params
  it('submit:: should rename image and scene if image is selected', () => {
    // @ts-ignore
    // spyOn(component.scenesService, 'renameImage', 'renameScene');
    // spyOn(component.scenesService, 'renameScene');
    component.imageSelected = true;
    component.submit({value: {nameScene: 'abc', nameImage: 'def'}});
    // @ts-ignore
    expect(scenesService.renameImage).toHaveBeenCalled();
    // @ts-ignore
    expect(scenesService.renameScene).toHaveBeenCalled();
  });

  // check if it calls specific service method based on the params
  it('submit:: should rename scene if image is not selected', () => {
    // @ts-ignore
    // spyOn(component.scenesService, 'renameImage', 'renameScene');
    component.imageSelected = false;
    component.submit({value: {name: 'abc'}});
    // @ts-ignore
    expect(scenesService.renameImage).not.toHaveBeenCalled();
    // @ts-ignore
    expect(scenesService.renameScene).toHaveBeenCalled();
  });
});
