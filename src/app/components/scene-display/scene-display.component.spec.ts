import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SceneDisplayComponent} from './scene-display.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('SceneDisplayComponent', () => {
  let component: SceneDisplayComponent;
  let fixture: ComponentFixture<SceneDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SceneDisplayComponent],
      imports: [MatDialogModule, ScrollingModule, TranslateModule.forRoot(), RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it is calls specific service method based on the params
  it('selectNonHiddenScene:: should select non hidden scenes', () => {
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.scenesService.SCENES = [
      { hidden: true, images: [{hidden: true}, { hidden: true }, { hidden: false }] },
      { hidden: true, images: [{hidden: true}, { hidden: true }, { hidden: false }] },
      { hidden: false, images: [{hidden: true}, { hidden: true }, { hidden: false }] }] as any;
    component.selectNonHiddenScene();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  });

  // check if it is calls specific service method based on the params
  it('selectNonHiddenScene:: should select non hidden scenes', () => {
    spyOn(component.sceneDisplayService, 'UpdateDimensions');
    component.scenesService.SCENES = [
      { hidden: true, images: [{hidden: true}, { hidden: true }, { hidden: true }] },
      { hidden: true, images: [{hidden: true}, { hidden: false }, { hidden: true }] },
      { hidden: true, images: [{hidden: true}, { hidden: false }, { hidden: true }] }] as any;
    component.selectNonHiddenScene();
    expect(component.sceneDisplayService.UpdateDimensions).toHaveBeenCalled();
  });

  // check different conditions of functions with different params and values
  describe('onScenesChange', () => {
    it('should not do anything if option is hide', () => {
      component.onScenesChange('hide');
      expect(component).toBeTruthy();
    });

    it('should remove the image if option is remove', () => {
      component.imageSelected = true;
      component.onScenesChange('remove');
      expect(component).toBeTruthy();
      expect(component.sceneDisplayService.selectedImage).toEqual(0);
    });

    it('should remove the image and scene if option is remove', () => {
      component.imageSelected = false;
      component.onScenesChange('remove');
      expect(component).toBeTruthy();
      expect(component.sceneDisplayService.selectedScene).toEqual(0);
      expect(component.sceneDisplayService.selectedImage).toEqual(0);
    });

    it('should emit image change if option is rename', () => {
      component.scenesService.SCENES = [
        { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] },
        { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] },
        { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] }] as any;
      spyOn(component.imageChange, 'emit');
      component.onScenesChange('rename');
      expect(component.imageChange.emit).toHaveBeenCalled();
    });

  });

  // check if it returns specific value
  it('hasAtLeastOneScene:: should return false if there is no scene', () => {
    component.scenesService.SCENES = null;
    expect(component.hasAtLeastOneScene()).toBeFalsy();
  });

  // check if it calls specific service method based on the setup params
  it('exit:: should stop dwellCursorService', () => {
    component.settingsService.DWELL_TIME_ENABLED = true;
    spyOn(component.dwellCursorService, 'stop');
    component.exit();
    expect(component.dwellCursorService.stop).toHaveBeenCalled();
  });

  // check if it doesn't call specific service method based on the setup params
  it('exit:: should not stop dwellCursorService if dwell time is not enabled', () => {
    component.settingsService.DWELL_TIME_ENABLED = false;
    spyOn(component.dwellCursorService, 'stop');
    component.exit();
    expect(component.dwellCursorService.stop).not.toHaveBeenCalled();
  });

  // check if it sets specific value to service variable based on component variable setter
  it('imageName Setter:: should set name in scenes of sceneService', () => {
    component.scenesService.SCENES = [
      { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] },
      { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] },
      { name: 'abc', images: [{name: 'xyz'}, { name: 'xyz' }, { name: 'xyz' }] }] as any;
    component.imageName = 'test';
    expect(
        component.scenesService.SCENES[component.sceneDisplayService.selectedScene].images[component.sceneDisplayService.selectedImage].name
        ).toEqual('test');
  });
});
