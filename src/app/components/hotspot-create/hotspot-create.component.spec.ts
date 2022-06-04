import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HotspotCreateComponent} from './hotspot-create.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('HotspotCreateComponent', () => {
  let component: HotspotCreateComponent;
  let fixture: ComponentFixture<HotspotCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotspotCreateComponent],
      imports: [MatDialogModule, TranslateModule.forRoot(), RouterTestingModule, BrowserAnimationsModule, ReactiveFormsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotspotCreateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calculeMilieuPolyline:: should set milieuPolyline with different conditions', () => {
    component.lastPt = [2, 3];
    component.xMin = 1;
    component.yMin = 1;
    component.xMax = 4;
    component.yMax = 4;
    component.calculeMilieuPolyline();
    expect(component.milieuPolyline).toEqual([2.5, 2.5]);
  });

  it('calculeMilieuPolyline:: should set milieuPolyline with different conditions', () => {
    component.lastPt = [2, 2];
    component.xMin = 3;
    component.yMin = 3;
    component.xMax = 1;
    component.yMax = 1;
    component.calculeMilieuPolyline();
    expect(component.milieuPolyline).toEqual([2, 2]);
  });

  it('rectangleDirection:: should set variables based on direction', () => {
    spyOn(document.querySelector('#rectangle'), 'setAttribute');
    const elem = document.querySelector('#rectangle');
    component.rectangleDirection(1, 2, 3, 4);
    expect(elem.setAttribute).toHaveBeenCalledWith('x', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('y', '2');
    expect(elem.setAttribute).toHaveBeenCalledWith('width', '2');
    expect(elem.setAttribute).toHaveBeenCalledWith('height', '2');
  });

  it('rectangleDirection:: should set variables based on direction', () => {
    spyOn(document.querySelector('#rectangle'), 'setAttribute');
    const elem = document.querySelector('#rectangle');
    component.rectangleDirection(4, 3, 2, 1);
    expect(elem.setAttribute).toHaveBeenCalledWith('x', '2');
    expect(elem.setAttribute).toHaveBeenCalledWith('y', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('width', '2');
    expect(elem.setAttribute).toHaveBeenCalledWith('height', '2');
  });

  it('rectangleDirection:: should set variables based on direction', () => {
    spyOn(document.querySelector('#rectangle'), 'setAttribute');
    const elem = document.querySelector('#rectangle');
    component.rectangleDirection(1, 4, 2, 3);
    expect(elem.setAttribute).toHaveBeenCalledWith('x', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('y', '3');
    expect(elem.setAttribute).toHaveBeenCalledWith('width', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('height', '1');
  });

  it('rectangleDirection:: should set variables based on direction', () => {
    spyOn(document.querySelector('#rectangle'), 'setAttribute');
    const elem = document.querySelector('#rectangle');
    component.rectangleDirection(4, 1, 3, 2);
    expect(elem.setAttribute).toHaveBeenCalledWith('x', '3');
    expect(elem.setAttribute).toHaveBeenCalledWith('y', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('width', '1');
    expect(elem.setAttribute).toHaveBeenCalledWith('height', '1');
  });

  it('rectangleDirection:: should not set variables based on direction if invalid values passed', () => {
    spyOn(document.querySelector('#rectangle'), 'setAttribute');
    const elem = document.querySelector('#rectangle');
    component.rectangleDirection(null, null, null, null);
    expect(elem.setAttribute).not.toHaveBeenCalled();
  });

  it('circlePoints:: should return points based on inputs and calculations', () => {
    const value = component.circlePoints(1, 2, 3);
    expect(value).toEqual(['1', '-1', '2', '-0.8284271247461903', '3', '-0.2360679774997898', '4', '2', '4', '2', '3', '4.23606797749979', '2', '4.82842712474619', '0', '4.82842712474619', '-1', '4.23606797749979', '-2', '2', '-2', '2', '-1', '-0.2360679774997898', '0', '-0.8284271247461903', '1', '-1']);
  });

  describe('drawsSVG', () => {
    it('should draw Polyline', () => {
      component.modeService.choiceDrawing = 'Polyline';
      component.DrawPolyline = false;
      component.firstPt = [1, 2];
      component.milieuRectangle = [1, 3];
      fixture.detectChanges();
      document.querySelector('#svg').dispatchEvent(new Event('pointerenter'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerdown'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerup'));
      expect(component.DrawPolyline).toBeTruthy();
      expect(component.DrawRectangle).toBeFalsy();
      expect(component.DrawCircle).toBeFalsy();
    });

    it('should draw Rectangle', () => {
      component.modeService.choiceDrawing = 'Rectangle';
      component.DrawRectangle = false;
      component.firstPt = [1, 2];
      component.milieuRectangle = [1, 3];
      fixture.detectChanges();
      document.querySelector('#svg').dispatchEvent(new Event('pointerenter'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerdown'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerup'));
      expect(component.DrawRectangle).toBeTruthy();
      expect(component.DrawCircle).toBeFalsy();
      expect(component.DrawPolyline).toBeFalsy();
    });

    it('should draw Circle', () => {
      component.modeService.choiceDrawing = 'Circle';
      component.DrawCircle = false;
      component.firstPt = [1, 2];
      component.milieuCircle =  [1, 2];
      fixture.detectChanges();
      document.querySelector('#svg').dispatchEvent(new Event('pointerenter'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerdown'));
      document.querySelector('#svg').dispatchEvent(new Event('pointerup'));
      expect(component.DrawCircle).toBeTruthy();
      expect(component.DrawPolyline).toBeFalsy();
      expect(component.DrawRectangle).toBeFalsy();
    });
  });
});
