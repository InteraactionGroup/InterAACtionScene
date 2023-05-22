import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotModifyDialogComponent} from './hotspot-modify-dialog.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from "@ngx-translate/core";
import { RouterTestingModule } from '@angular/router/testing';
import { ScenesService } from 'src/app/services/scenes.service';
import {HttpClientModule} from "@angular/common/http";
import {ImageHotspot, SoundHotspot} from '../../types';

describe('HotspotModifyDialogComponent', () => {
  let component: HotspotModifyDialogComponent;
  let fixture: ComponentFixture<HotspotModifyDialogComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<HotspotModifyDialogComponent>>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const dialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes', 'checkNames']);
    TestBed.configureTestingModule({
      declarations: [HotspotModifyDialogComponent],
      imports: [MatDialogModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot(), RouterTestingModule, HttpClientModule],
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
    fixture = TestBed.createComponent(HotspotModifyDialogComponent);
    component = fixture.componentInstance;
    // component.hotspot = {name: 'abc', type: 'soundAudio'} as SoundHotspot;
    component.hotspot = new SoundHotspot('abc', [1, 2, 3], 'white', 'writeAudio', 2, 'test');
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<HotspotModifyDialogComponent>>;
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    component.setType('abc');
    expect(component.type).toEqual('abc');
  });

  // check if it calls specific service method
  it('submit:: should submit the modification from dialog', () => {
    spyOn(component, 'modifyCenterHotspot');
    sceneService.checkNames.and.returnValue(false);
    component.type = 'soundAudio';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.modeService.modifyiedHotspot = {} as any;
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.modifyCenterHotspot).toHaveBeenCalled();
  });

  it('submit:: should modify the hotspot correctly, soundAudio into new soundAudio', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.type = 'soundAudio';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.modeService = component.modeService;
    sceneService.checkNames.and.returnValue(true);
    let soundHotspot = new SoundHotspot('test', [1, 2, 3], 'white', 'soundAudio', 2, 'test');
    sceneService.SCENES = [{images: [{hotspots: [soundHotspot]}]}] as any;
    component.hotspot = soundHotspot;
    component.submit({value : {soundSelected: 'abc', name: 'testabc', color: '#ffffff', strokeWidth: 2}});
    expect(component.hotspot.name).toEqual('testabc');
    expect(component.hotspot.strokeColor).toEqual('#ffffff');
    expect(component.hotspot.getData()).toEqual('abc');
  });

  it('submit:: should modify the hotspot correctly, soundAudio into refImage', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.type = 'refImage';
    component.numImage = 1;
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.modeService = component.modeService;
    sceneService.checkNames.and.returnValue(true);
    let soundHotspot = new SoundHotspot('test', [1, 2, 3], 'white', 'soundAudio', 2, 'test');
    sceneService.SCENES = [{images: [{hotspots: [soundHotspot]}, {name: 'image2'}]}] as any;
    component.hotspot = soundHotspot;
    component.submit({value : {soundSelected: '', name: 'testabc', color: '#ffffff', strokeWidth: 2, refImage: 1}});
    expect(component.hotspot instanceof SoundHotspot).toBeFalse();
    expect(component.hotspot instanceof ImageHotspot).toBeTrue();
    expect(component.hotspot.name).toEqual('testabc');
    expect(component.hotspot.strokeColor).toEqual('#ffffff');
    expect(component.hotspot.getData()).toEqual(1);
  });

  it('submit:: should modify the hotspot correctly, refImage into new refImage', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.type = 'refImage';
    component.numImage = 1;
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.modeService = component.modeService;
    sceneService.checkNames.and.returnValue(true);
    let imageHotspot = new ImageHotspot('test', [1, 2, 3], 'white', 'soundAudio', 2, 0);
    sceneService.SCENES = [{images: [{hotspots: [imageHotspot]}, {name: 'image2'}]}] as any;
    component.hotspot = imageHotspot;
    component.submit({value : {soundSelected: '', name: 'testabc', color: '#ffffff', strokeWidth: 2, refImage: 1}});
    expect(component.hotspot.name).toEqual('testabc');
    expect(component.hotspot.strokeColor).toEqual('#ffffff');
    expect(component.hotspot.getData()).toEqual(1);
  });

  it('submit:: should modify the hotspot correctly, refImage into soundAudio', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.type = 'soundAudio';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.modeService = component.modeService;
    sceneService.checkNames.and.returnValue(true);
    let imageHotspot = new ImageHotspot('test', [1, 2, 3], 'white', 'soundAudio', 2, 0);
    sceneService.SCENES = [{images: [{hotspots: [imageHotspot]}, {name: 'image2'}]}] as any;
    component.hotspot = imageHotspot;
    component.submit({value : {soundSelected: 'abc', name: 'testabc', color: '#ffffff', strokeWidth: 2}});
    expect(component.hotspot instanceof ImageHotspot).toBeFalse();
    expect(component.hotspot instanceof SoundHotspot).toBeTrue();
    expect(component.hotspot.name).toEqual('testabc');
    expect(component.hotspot.strokeColor).toEqual('#ffffff');
    expect(component.hotspot.getData()).toEqual('abc');
  });


  // check if it calls specific service method
  it('submit:: should redraw and delete oldCenter hotspot', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.hotspot = {name: 'abc', type: 'writeAudio', svgPointArray: []} as any;
    sceneService.checkNames.and.returnValue(false);
    component.type = 'writeAudio';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.modeService.modifyiedHotspot = null;
    component.modeService.currentDrawingTool = 'redraw';
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.deleteOldCenterHotspot).toHaveBeenCalled();
  });

  // check if it shows specific error
  it('submit:: should show error if name is incorrect', () => {
    spyOn(component.translate, 'instant');
    sceneService.checkNames.and.returnValue(false);
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.submit({value : {soundSelected: '', name: 'xyz', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(component.translate.instant).toHaveBeenCalledWith('error.name');
  });

  // check if it shows specific error
  it('submit:: should show error if strokeWidth is incorrect', () => {
    spyOn(component.translate, 'instant');
    sceneService.checkNames.and.returnValue(false);
    component.type = 'soundAudio';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.modeService.modifyiedHotspot = {} as any;
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 0}});
    expect(component.translate.instant).toHaveBeenCalledWith('error.stroke');
  });

  // check if it sets up specific variables in service
  it('redraw:: should set properties in modeService', () => {
    component.redraw();
    expect(component.modeService.selectedMode).toEqual('hotspot');
    expect(component.modeService.currentDrawingTool).toEqual('redraw');
  });

  // check if it sets up specific variables in service
  it('close:: should set properties in modeService', () => {
    component.close();
    expect(component.modeService.selectedMode).toEqual('hotspot');
    expect(component.modeService.currentDrawingTool).toEqual('modify');
    expect(component.modeService.modifyiedHotspot).toEqual(null);
  });

  // set up variable to set hotspot as writeAudio
  // check if it sets form value based on that or not
  it('should create component with writeAudio', () => {
    // component.hotspot = {name: 'abc', type: 'writeAudio'} as SoundHotspot;
    component.hotspot = new SoundHotspot('abc', [1,2,3], 'white',  'writeAudio', 2, null);
    fixture.detectChanges();
    expect(component.form.value.soundSelected).toEqual('');
  });

  // spy upon the FileReader and return the object which is used in the function
  // at last just checked if FileReader instance is getting created or not
  it('onSoundSelected:: should show error if file reader fails', () => {
    spyOn(window, 'FileReader').and.returnValue({
      onload: function() {},
      readAsDataURL : function() {
        return true;
      },
      onerror: () => {}
    } as any);
    component.onSoundSelected({target: {files: 'test'}});
    // @ts-ignore
    window.FileReader().onload();
    // @ts-ignore
    window.FileReader().onerror('error');
    expect(window.FileReader).toHaveBeenCalled();
    expect(component.error).toEqual('');
  });

  // set up hotspot object and spy upon the component methods
  // check if it calls dialog close method and as well as deleteOldCenterHotspot method
  it('submit:: should redraw and delete oldCenter hotspot', () => {
    spyOn(component, 'deleteOldCenterHotspot');
    spyOn(component, 'modifyCenterHotspot');
    component.hotspot = {name: 'abc', type: 'writeAudio', svgPointArray: []} as any;
    sceneService.checkNames.and.returnValue(false);
    component.type = 'abc';
    component.selectedSound = 'abc';
    component.selectedScene = 0;
    component.selectedImage = 0;
    sceneService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.modeService.modifyiedHotspot = null;
    component.modeService.currentDrawingTool = 'redraw';
    sceneService.modeService = component.modeService;
    component.submit({value : {soundSelected: '', name: 'abc', color: '#ffffff', write: 'test', strokeWidth: 2}});
    expect(dialogRef.close).toHaveBeenCalled();
    expect(component.deleteOldCenterHotspot).toHaveBeenCalled();
  });

  // spy upon the FileReader and return the object which is used in the function
  // at last just check if FileReader instance is getting created or not
  it('stop:: should read file and select sound', () => {
    spyOn(component.audioRecorderService, 'stopRecording');
    spyOn(window, 'FileReader').and.returnValue({
      onload: function() {},
      readAsDataURL : function() {
        return true;
      },
      onerror: () => {}
    } as any);
    spyOn(component.audioRecorderService, 'getRecord');
    component.stop();
    // @ts-ignore
    window.FileReader().onload();
    // @ts-ignore
    window.FileReader().onerror('error');
    expect(window.FileReader).toHaveBeenCalled();
    expect(component.error).toEqual('');
  });

  // set up hotspot variable and call deleteOldCenterHotspot method
  // check if it deletes the record and decreases array size by 1
  it('deleteOldCenterHotspot:: should delete hotspots which are center', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    component.hotspot = {name: '', type: 'writeAudio', svgPointArray: []} as any;
    // @ts-ignore
    component.scenesService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    component.deleteOldCenterHotspot();
    // @ts-ignore
    expect(component.scenesService.SCENES[component.selectedScene].images[component.selectedImage].hotspots.length).toEqual(1);
  });

  // set up empty hotspot variable and call deleteOldCenterHotspot method
  // check if it is not doing anything
  it('deleteOldCenterHotspot:: should not delete hotspots if selected scene is not set', () => {
    component.selectedScene = undefined;
    component.selectedImage = 0;
    component.deleteOldCenterHotspot();
    expect(component).toBeTruthy();
  });

  // set up scenes and other variables and call modifyCenterHotspot method
  // check if it doesn't increase or decrease the array length and just change the object properties
  it('modifyCenterHotspot:: should set properties to center hotspots', () => {
    component.selectedScene = 0;
    component.selectedImage = 0;
    // @ts-ignore
    component.scenesService.SCENES = [{images: [{hotspots: [{name: 'Center'}, {name: 'ABC'}]}]}] as any;
    // @ts-ignore
    component.scenesService.nameHotspot = '';
    // @ts-ignore
    component.scenesService.colorHotspot = '';
    // @ts-ignore
    component.scenesService.soundHotspot = '';
    component.modifyCenterHotspot('');
    // @ts-ignore
    expect(component.scenesService.SCENES[component.selectedScene].images[component.selectedImage].hotspots.length).toEqual(2);
  });
});
