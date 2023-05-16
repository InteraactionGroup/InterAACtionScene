import {TestBed} from '@angular/core/testing';

import {SceneDisplayService} from './scene-display.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from "@angular/common/http";

export const imgBase64Mock = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=`;


describe('SceneDisplayService', () => {
  let service: SceneDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientModule]
    });
    service = TestBed.inject(SceneDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it calls specific function after calling the function
  it('UpdateDimensions:: should update dimensions of canvas', () => {
    spyOn(service, 'onCanvasChange');
    service.selectedScene = 0;
    service.selectedImage = 0;
    service.scenesService.SCENES = [{ images: [{base64data: imgBase64Mock}] }] as any;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: 2, clientHeight: 2 } as any);
    service.UpdateDimensions();
    expect(service.onCanvasChange).toHaveBeenCalled();
  });

  // check if it calls specific function after calling the function
  it('UpdateDimensions:: should set image width and height if condtion suffise', () => {
    spyOn(service, 'onCanvasChange');
    service.selectedScene = 0;
    service.selectedImage = 0;
    service.settingsService.AFSR = true;
    service.scenesService.SCENES = [{ images: [{base64data: imgBase64Mock}] }] as any;
    const img = new Image();
    img.src = imgBase64Mock;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: img.width + 20, clientHeight: img.height - 20 } as any);
    service.UpdateDimensions();
    expect(service.onCanvasChange).toHaveBeenCalled();
  });

  // check if it calls specific function after calling the function
  it('UpdateDimensions:: should set image width and height if condtion suffise', () => {
    spyOn(service, 'onCanvasChange');
    service.selectedScene = 0;
    service.selectedImage = 0;
    service.settingsService.AFSR = true;
    service.scenesService.SCENES = [{ images: [{base64data: imgBase64Mock}] }] as any;
    const img = new Image();
    img.src = imgBase64Mock;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: img.width - 20, clientHeight: img.height + 20 } as any);
    service.UpdateDimensions();
    expect(service.onCanvasChange).toHaveBeenCalled();
  });

  it('zoomInOrOut:: should add 0.5 and substract 0.5 to zoom when the conditions are check', () => {
    const img = new Image();
    img.src = imgBase64Mock;
    img.width = 200;
    img.height = 200;
    service.imageWidth = img.width;
    service.imageHeigth = img.height;
    service.scenesService.SCENES = [{ images: [{base64data: imgBase64Mock}] }] as any;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: img.width + 50, clientHeight: img.height + 50 } as any);
    spyOn(service, 'UpdateDimensions');
    // spyOn(service, 'zoomInOrOut');

    service.zoom = 1;
    service.zoomInOrOut('in');
    expect(service.zoom).toEqual(1.5);
    expect(service.UpdateDimensions).toHaveBeenCalled();
    service.zoomInOrOut('out');
    expect(service.zoom).toEqual(1);
    expect(service.UpdateDimensions).toHaveBeenCalled();
  });

  it('zoomInOrOut:: should not add 0.5 and substract 0.5 to zoom when his parameter is wrong', () => {
    const img = new Image();
    img.src = imgBase64Mock;
    img.width = 200;
    img.height = 200;
    service.imageWidth = img.width;
    service.imageHeigth = img.height;
    service.scenesService.SCENES = [{ images: [{base64data: imgBase64Mock}] }] as any;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: img.width + 50, clientHeight: img.height + 50 } as any);
    spyOn(service, 'UpdateDimensions');

    service.zoom = 1;
    service.zoomInOrOut('wrongString');
    expect(service.zoom).toEqual(1);
    expect(service.UpdateDimensions).not.toHaveBeenCalled();

  });

  it('zoomInOrOut:: should not add 0.5 and substract 0.5 to zoom when the conditions aren\'t check', () => {
    const img = new Image();
    img.src = imgBase64Mock;
    spyOn(document, 'getElementById').and.returnValue({ clientWidth: img.width - 20, clientHeight: img.height + 20 } as any);
    spyOn(service, 'UpdateDimensions');

    service.zoom = 1;
    service.zoomInOrOut('in');
    expect(service.zoom).toEqual(1);
    expect(service.UpdateDimensions).not.toHaveBeenCalled();
    service.zoomInOrOut('out');
    expect(service.zoom).toEqual(1);
    expect(service.UpdateDimensions).not.toHaveBeenCalled();
    service.zoomInOrOut('wrongString');
    expect(service.zoom).toEqual(1);
    expect(service.UpdateDimensions).not.toHaveBeenCalled();

  });
});
