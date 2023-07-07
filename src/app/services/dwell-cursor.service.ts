import {Injectable} from '@angular/core';
import {Hotspot} from "../types";
import {Subject} from 'rxjs';
import {max} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DwellCursorService {

  public visible = false;
  public started = false;
  public maxValue = 0;
  public currentValue = 0;
  public countDownDate = 0;
  public timeout;

  public x = 0;
  public y = 0;

  spinnerValueObservable = new Subject<number>();
  spinnerChoiceObservable = new Subject<boolean>();
  changeSpinner: boolean = true;

  constructor() {
  }

  public resetMax(max) {
    this.maxValue = max;
    this.spinnerChoiceObservable.next(this.changeSpinner);
    this.changeSpinner = !this.changeSpinner;
  }

  public stop() {
    window.clearInterval(this.timeout);
    this.visible = false;
    this.started = false;
    this.currentValue = 0;
  }

  public playToMax(max) {
    this.resetMax(max);
    this.play();
  }

  public updatePositionHTMLElement(element: HTMLElement){
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.getBoundingClientRect();
    let  offsetTop  = elemRect.top - bodyRect.top;
    let  offsetLeft  = elemRect.left - bodyRect.left;
    let  offsetBottom  = elemRect.bottom - bodyRect.top;
    let  offsetRight  = elemRect.right - bodyRect.left;

    this.x = (offsetLeft + offsetRight)/2 - 25;
    this.y = (offsetTop + offsetBottom)/2 - 25;
  }

  public updatePositionSVGPolygonElement(element: HTMLElement, hotspotPoints: {x:number,y:number}[]){
    let bodyRect = document.body.getBoundingClientRect();
    let elemRect = element.parentElement.getBoundingClientRect();
    let  offsetTop  = elemRect.top - bodyRect.top;
    let  offsetLeft  = elemRect.left - bodyRect.left;

    let sumOfX=0;
    let sumOfY=0;

    for( let i = 0; i < hotspotPoints.length; i++){
      sumOfX+=hotspotPoints[i].x;
      sumOfY+=hotspotPoints[i].y;
    }

    sumOfX = sumOfX / hotspotPoints.length;
    sumOfY = sumOfY / hotspotPoints.length;

    this.x = offsetLeft + sumOfX - 10;
    this.y = offsetTop + sumOfY - 10;
  }

  public play() {
    this.countDownDate = new Date().getTime();
    this.visible = true;
    this.started = true;
    this.setInterval();
  }

  public setInterval() {
    this.timeout = setInterval(() => {
      this.currentValue = new Date().getTime() - this.countDownDate;
      this.spinnerValueObservable.next(Math.floor((this.currentValue / this.maxValue) * 100));
      if (this.currentValue >= this.maxValue) {
        this.stop();
      }
    }, 10);
  }

}
