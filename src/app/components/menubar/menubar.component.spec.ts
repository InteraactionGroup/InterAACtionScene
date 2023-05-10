import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MenubarComponent} from './menubar.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import { ScenesService } from 'src/app/services/scenes.service';
import {HttpClientModule} from "@angular/common/http";

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes', 'getScenes']);
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(),RouterTestingModule, MatDialogModule, HttpClientModule],
      declarations: [MenubarComponent],
      providers: [
        { provide: ScenesService, useValue: sceneServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenubarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    sceneService = TestBed.inject(ScenesService) as jasmine.SpyObj<ScenesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it calls specific functions to make fullscreen
  it('fullScreen:: should enter full screen', fakeAsync(() => {
    spyOnProperty(document, 'fullscreenElement', 'get').and.returnValue(true);
    spyOn(document, 'exitFullscreen');
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.fullScreen();
    tick(1500);
    expect(document.exitFullscreen).toHaveBeenCalled();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  // check if it calls specific functions to exit fullscreen
  it('fullScreen:: should exit full screen', fakeAsync(() => {
    spyOnProperty(document, 'fullscreenElement', 'get').and.returnValue(null);
    spyOn(document.documentElement, 'requestFullscreen');
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.fullScreen();
    tick(1500);
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  // check if it calls specific service methods
  it('hideShowMenu:: should hide show menu', fakeAsync(() => {
    component.modeService.displayBar = true;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowMenu();
    tick(1500);
    expect(component.modeService.displayBar).toBeFalsy();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  // check if it calls specific service methods
  it('hideShowMenu:: should show show menu', fakeAsync(() => {
    component.modeService.displayBar = false;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowMenu();
    tick(1500);
    expect(component.modeService.displayBar).toBeTruthy();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  // check if it sets specific service variables
  it('hideShowPanel:: should hide show panel', fakeAsync(() => {
    component.sceneDisplayService.hidePanel = true;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowPanel();
    tick(1500);
    expect(component.sceneDisplayService.hidePanel).toBeFalsy();
  }));

  // check if it sets specific service variables
  it('hideShowPanel:: should show show panel', fakeAsync(() => {
    component.sceneDisplayService.hidePanel  = false;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowPanel();
    tick(1500);
    expect(component.sceneDisplayService.hidePanel).toBeTruthy();
  }));

  // check if it opens the dialog
  it('logout:: should open logout dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.logout();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('openDialogTuto:: should open Tutorial dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.openDialogTuto();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it sets specific variable
  it('onImageChange:: should change scene title', () => {
    component.onImageChange('test');
    expect(component.sceneTitle).toEqual('test');
  });

  // check if it sets specific values in the service variables
  it('changeMode:: should change mode to given mode', () => {
    component.changeMode('mode1');
    expect(component.modeService.currentDrawingTool).toEqual('');
    expect(component.modeService.choiceDrawing).toEqual('');
    expect(component.modeService.selectedMode).toEqual('mode1');
  });

  // check if it sets specific values in the service variables
  it('changeColor:: should change color to given color', () => {
    component.changeColor('color1');
    expect(component.modeService.choiceDrawing).toEqual('');
    expect(component.modeService.currentDrawingTool).toEqual('color1');
  });

  it('changeSize:: should change size to given size', () => {
    component.changeSize(10);
    expect(component.modeService.sizeDrawingTool).toEqual(10);
  });

  // check if it sets specific values in the service variables
  it('choiceDrawing:: should change drawing to given drawing', () => {
    component.choiceDrawing('drawing1');
    expect(component.modeService.choiceDrawing).toEqual('drawing1');
  });
});
