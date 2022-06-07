import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CanvasComponent} from './canvas.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('CanvasComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CanvasComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Setter should not do anything if cx is not set
  it('currentDrawingTool:: should not do anything if cx is not set', () => {
      // @ts-ignore Ignoring as private member of class
      component.cx = undefined as any;
      component.currentDrawingTool = 'white';
      expect(component).toBeTruthy();
  });

  // Configured all the switch cases with different values
  describe('setter:: currentDrawingTool', () => {
    beforeEach(() => {
      // @ts-ignore Ignoring as private member of class
      component.cx = { clearRect: () => {} } as any;
    });

    it('should set as white strokeStyle', () => {
      component.currentDrawingTool = 'white';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#FFFFFF');
    });

    it('should set as white strokeStyle', () => {
      component.currentDrawingTool = 'white';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#FFFFFF');
    });

    it('should set as black strokeStyle', () => {
      component.currentDrawingTool = 'black';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#000000');
    });

    it('should set as red strokeStyle', () => {
      component.currentDrawingTool = 'red';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#f34336');
    });

    it('should set as orange strokeStyle', () => {
      component.currentDrawingTool = 'orange';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#ff7f00');
    });

    it('should set as blue strokeStyle', () => {
      component.currentDrawingTool = 'blue';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#0080ff');
    });

    it('should set as green strokeStyle', () => {
      component.currentDrawingTool = 'green';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#228b22');
    });

    it('should set white as default strokeStyle', () => {
      component.currentDrawingTool = 'LOL!';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.strokeStyle).toEqual('#FFFFFF');
    });

    it('should clear canvas', () => {
      // @ts-ignore Ignoring as private member of class
      spyOn(component.cx, 'clearRect');
      component.currentDrawingTool = 'clear';
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.clearRect).toHaveBeenCalled();
    });

    afterEach(() => {
      // @ts-ignore Ignoring as private member of class
      expect(component.cx.globalCompositeOperation).toEqual('source-over');
    });
  });

  // check console log from passed value
  it('print:: should log in the console', () => {
    spyOn(console, 'log');
    component.print('test');
    expect(console.log).toHaveBeenCalledWith('test');
  });

  // check if function sets up the variables to specific values
  it('stopDraw:: should stop drawing', () => {
    spyOn(component, 'saveCanvas').and.callThrough();
    component.stopDraw();
    expect(component.drawStarted).toBeFalsy();
    expect(component.prevPos).toEqual({x: null, y: null});
    expect(component.currentPos).toEqual({x: null, y: null});
    expect(component.saveCanvas).toHaveBeenCalled();
  });

  // check if draw function is worked with variables with different conditions
  describe('draw', () => {
    const mouseEvent = { offsetX: 1, offsetY: 2 } as any;
    beforeEach(() => {
      // @ts-ignore Ignoring as private member of class
      spyOn(component, 'drawOnCanvas');
    });

    it('should not draw if draw is not started', () => {
      component.drawStarted = false;
      component.draw(mouseEvent);
      expect(component.currentPos).toEqual({x: null, y: null});
      expect(component.prevPos).toEqual({x: null, y: null});
    });

    it('should draw based on mouse events', () => {
      component.drawStarted = true;
      component.currentPos = { x: 2, y: 3 } as any;
      component.draw(mouseEvent);
      expect(component.prevPos).toEqual({ x: 2, y: 3 });
      expect(component.currentPos).toEqual({ x: 1, y: 2 });
    });
  });
});
