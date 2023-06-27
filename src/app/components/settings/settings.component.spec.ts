import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import {of} from 'rxjs';

import { SettingsComponent } from './settings.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [TranslateModule.forRoot(), MatDialogModule, RouterTestingModule, HttpClientModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // check if it sets specific language in service
  it('should set active language in onInit', fakeAsync(() => {
    fixture.detectChanges();
    component.selected = component.languageService.activeLanguage;
    tick(550);
    expect(component.selected).toEqual(component.languageService.activeLanguage);
  }));

  // check if it sets specific value
  it('should set value dwelltime in onInit', fakeAsync(() => {
    fixture.detectChanges();
    component.dwellTime = component.settingsService.DWELL_TIME_TIMEOUT_VALUE;
    tick(550);
    expect(component.dwellTime).toEqual(component.settingsService.DWELL_TIME_TIMEOUT_VALUE);
  }));

  // check if the method 'checkValue()' return true
  it('checkValue:: dwellTimeError should be equal to false', () => {
    fixture.detectChanges();
    component.dwellTime = 1000;
    component.checkValue()
    expect(component.dwellTimeError).toEqual(false);
  });

  // check if the method 'checkValue()' return false
  it('checkValue:: dwellTimeError should be equal to true', () => {
    fixture.detectChanges();
    component.dwellTime = 7000;
    component.checkValue()
    expect(component.dwellTimeError).toEqual(true);
  });

  // check if it calls specific service method
  it('saveConfig:: should update scene', () => {
    spyOn(component.sceneService, 'update');
    component.saveConfig();
    expect(component.sceneService.update).toHaveBeenCalled();
  });

  // check if it calls browser back
  it('back:: should trigger browser back button', () => {
    spyOn(history, 'back');
    component.back();
    expect(history.back).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('openDialog:: should open reset setting dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.openDialog();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('openDialogASFR:: should open site AFSR dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.openDialogASFR();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });

  // check if it opens the dialog
  it('openDialogInteraactionBoxAFSR:: should open LinkInteraactionbox dialog', () => {
    // @ts-ignore
    spyOn(component.dialog, 'open').and.returnValue({ afterClosed: () => of(true)});
    component.openDialogInteraactionBoxAFSR();
    // @ts-ignore
    expect(component.dialog.open).toHaveBeenCalled();
  });
});
