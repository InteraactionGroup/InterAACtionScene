import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { DefaultStandardSceneComponent } from './default-standard-scene.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import { of } from 'rxjs';

describe('DefaultStandardSceneComponent', () => {
  let component: DefaultStandardSceneComponent;
  let fixture: ComponentFixture<DefaultStandardSceneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultStandardSceneComponent ],
      imports: [TranslateModule.forRoot(), MatDialogModule, RouterTestingModule, HttpClientModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultStandardSceneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // check if it doesn't call function if required variable is missing
  it('it should not call defaultScene if scenes is present', fakeAsync(() => {
    component.scenesService.SCENES = [{}] as any;
    spyOn(component, 'defaultScene');
    fixture.detectChanges();
    tick(60);
    expect(component.defaultScene).not.toHaveBeenCalled();
  }));

  // check if it loads the data which is returned from service method
  it('defaultScene:: should load default scene', () => {
    spyOn(component, 'getJSON').and.returnValue(of([true]));
    component.defaultScene();
    expect(component.scenesService.SCENES).toEqual([true] as any);
  });

  // check if it loads the data which is returned from service method
  it('defaultScene:: should load default scene', () => {
    spyOn(component, 'getJSON').and.returnValue(of(null));
    component.defaultScene();
    expect(component.scenesService.SCENES).toEqual([]);
  });
});
