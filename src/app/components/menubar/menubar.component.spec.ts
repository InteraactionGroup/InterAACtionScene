import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {MenubarComponent} from './menubar.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from '@angular/material/dialog';
import { ScenesService } from 'src/app/services/scenes.service';

describe('MenubarComponent', () => {
  let component: MenubarComponent;
  let fixture: ComponentFixture<MenubarComponent>;
  let sceneService: jasmine.SpyObj<ScenesService>;

  beforeEach(async(() => {
    const sceneServiceMock = jasmine.createSpyObj('ScenesService', ['updateScenes', 'getScenes']);
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(),RouterTestingModule, MatDialogModule],
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

  it('fullScreen:: should enter full screen', fakeAsync(() => {
    spyOnProperty(document, 'fullscreenElement', 'get').and.returnValue(true);
    spyOn(document, 'exitFullscreen');
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.fullScreen();
    expect(document.exitFullscreen).toHaveBeenCalled();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  it('fullScreen:: should exit full screen', fakeAsync(() => {
    spyOnProperty(document, 'fullscreenElement', 'get').and.returnValue(null);
    spyOn(document.documentElement, 'requestFullscreen');
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.fullScreen();
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  it('hideShowMenu:: should hide show menu', fakeAsync(() => {
    component.modeService.displayBar = true;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowMenu();
    expect(component.modeService.displayBar).toBeFalsy();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  it('hideShowMenu:: should show show menu', fakeAsync(() => {
    component.modeService.displayBar = false;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowMenu();
    expect(component.modeService.displayBar).toBeTruthy();
    tick(30);
    expect(sceneService.updateScenes).toHaveBeenCalled();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  }));

  it('hideShowPanel:: should hide show panel', fakeAsync(() => {
    component.sceneDisplayService.hidePanel = true;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowPanel();
    expect(component.sceneDisplayService.hidePanel).toBeFalsy();
  }));

  it('hideShowPanel:: should show show panel', fakeAsync(() => {
    component.sceneDisplayService.hidePanel  = false;
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.hideShowPanel();
    expect(component.sceneDisplayService.hidePanel).toBeTruthy();
  }));
});
