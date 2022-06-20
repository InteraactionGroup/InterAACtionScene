import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

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

  // setter should not do anything if cx is not set
  it('currentDrawingTool:: should not do anything if cx is not set', () => {
      // @ts-ignore Ignoring as private member of class
      component.cx = undefined as any;
      component.currentDrawingTool = 'white';
      expect(component).toBeTruthy();
  });

  // configure all the switch cases with different values
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

  // call function and check if it is setting value
  it('should clear canvas', () => {
    component.currentDrawingTool = 'erase';
    // @ts-ignore Ignoring as private member of class
    expect(component.cx.globalCompositeOperation).toEqual('destination-out');
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

  // check if Draw function works with variables with different conditions
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

  // check if it calls specific functions after setting up required values
  it('imageChange:: should saveCanvas', fakeAsync(() => {
    spyOn(component, 'InitializeCanvasWithJSON').and.callThrough();
    spyOn(component, 'ngAfterViewInit').and.callThrough();
    spyOn(component, 'saveCanvas');
    // @ts-ignore
    component.cx = 1;
    component.canvasD = '{"test": 123}';
    component.canvas = undefined;
    component.imageChange = 10;
    tick(15);
    expect(component.saveCanvas).toHaveBeenCalled();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
    expect(component.InitializeCanvasWithJSON).toHaveBeenCalled();
  }));

  // check if it doesn't call function after not setting up required values
  it('imageChange:: should not saveCanvas if cx is not set', fakeAsync(() => {
    spyOn(component, 'InitializeCanvasWithJSON').and.callThrough();
    spyOn(component, 'ngAfterViewInit').and.callThrough();
    spyOn(component, 'saveCanvas');
    // @ts-ignore
    component.cx = undefined;
    component.canvasD = '{"test": 123}';
    component.canvas = undefined;
    component.imageChange = 10;
    tick(15);
    expect(component.saveCanvas).not.toHaveBeenCalled();
    expect(component.ngAfterViewInit).toHaveBeenCalled();
    expect(component.InitializeCanvasWithJSON).toHaveBeenCalled();
  }));

  // should set variable if it is set to null and do the same
  it('draw:: should set currentPos if currentPos is not set', () => {
    component.drawStarted = true;
    component.currentPos = { x: null, y: null } as any;
    const mouseEvent = { offsetX: 1, offsetY: 2 } as any;
    component.modeService.selectedMode = 'draw';
    component.draw(mouseEvent);
    expect(component.prevPos).toEqual({ x: 1, y: 2 });
    expect(component.currentPos).toEqual({ x: 1, y: 2 });
  });

  // check if it doesn't do anything if required variable is not set
  it('drawOnCanvas:: should not do anything if cx is not defined', () => {
    // @ts-ignore
    component.cx = undefined;
    // @ts-ignore
    component.drawOnCanvas({x: 1, y: 2}, {x: 3, y: 4});
    // @ts-ignore
    component.cx = { beginPath: () => {} };
    // @ts-ignore
    component.drawOnCanvas(null, {x: 3, y: 4});
    expect(component).toBeTruthy();
  });

  // set up the variables which are required for the method
  // create the image class and call on load method
  // check if it calls specific components methods or not
  it('InitializeCanvasWithJSON:: should initialize canvas with json data', () => {
    component.canvasD = '{"test": 123}';
    spyOn(window, 'Image').and.returnValue({
      onload: () => {}
    } as any);
    // @ts-ignore
    component.cx = { clearRect: () => {}, drawImage: () => {} };
    // @ts-ignore
    spyOn(component.cx, 'clearRect');
    // @ts-ignore
    spyOn(component.cx, 'drawImage');
    component.InitializeCanvasWithJSON();
    // @ts-ignore
    window.Image().onload();
    // @ts-ignore
    expect(component.cx.clearRect).toHaveBeenCalled();
    // @ts-ignore
    expect(component.cx.drawImage).toHaveBeenCalled();
  });

  // use fakeAsync as we have added timeout
  // spy upon the canvas method and call the save function
  // check if service Save method is called
  it('saveCanvas:: should save canvas to scene service', fakeAsync(() => {
    spyOn(component.canvas.nativeElement, 'toDataURL').and.returnValue('test');
    // @ts-ignore
    spyOn(component.scenesService, 'canvasSave');
    component.saveCanvas();
    tick(10);
    // @ts-ignore
    expect(component.scenesService.canvasSave).toHaveBeenCalled();
  }));
});
