import { TestBed } from '@angular/core/testing';

import { DwellCursorService } from './dwell-cursor.service';

describe('DwellCursorService', () => {
  let service: DwellCursorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwellCursorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('resetMax:: should set maxVal', () => {
    service.resetMax(1);
    expect(service.maxValue).toEqual(1);
  });

  // check if it sets specific variables after calling the function
  it('stop:: should stop playing', () => {
    service.stop();
    expect(service.visible).toBeFalsy();
    expect(service.started).toBeFalsy();
    expect(service.currentValue).toEqual(0);
  });

  // check if it sets specific variables after calling the function
  it('playToMax:: should reset max and call the play', () => {
    service.playToMax(10);
    expect(service.maxValue).toEqual(10);
  });

  it('updatePositionHTMLElement:: should update position of given element', () => {
    service.updatePositionHTMLElement(document.body);
    expect(service).toBeTruthy();
  });

  it('updatePositionSVGPolygonElement:: should update position of given element', () => {
    service.updatePositionSVGPolygonElement(document.body, [{x: 10, y: 20},{x: 20, y: 10}]);
    expect(service).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('play:: should play the scene', () => {
    service.maxValue = 9654425657725;
    service.play();
    expect(service.visible).toBeTruthy();
    expect(service.started).toBeTruthy();
  });
});
