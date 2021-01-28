import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ScenesService} from '../../services/scenes.service';
import {HotspotCreateDialogComponent} from '../hotspot-create-dialog/hotspot-create-dialog.component';
import {ModeService} from '../../services/mode.service';
import {HotspotModifyDialogComponent} from "../hotspot-modify-dialog/hotspot-modify-dialog.component";
import {Hotspot} from "../../types";
import {FormGroup} from "@angular/forms";

declare const SVG: any;

@Component({
  selector: 'app-hotspot-create',
  templateUrl: './hotspot-create.component.html',
  styleUrls: ['./hotspot-create.component.css']
})

export class HotspotCreateComponent implements OnInit {

  @Input() public width: number;
  @Input() public height: number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @Input() public currImage: number;
  @Output() updateHotspots = new EventEmitter<string>();

  constructor(
    private scenesService: ScenesService,
    private dialog: MatDialog, public modeService: ModeService) {
  }

  lastPt = null;
  firstPt = null;
  startDrawRectangle = true;
  startDrawCircle = true;
  DrawPolyline = false;
  DrawRectangle = false;
  DrawCircle = false;

  ngOnInit() {
    this.drawsSVG();
  }

  createMouseEventPolyline() {
    const polyline = document.querySelector('#polyline');
    return (e: MouseEvent) => {
      let pts = polyline.getAttribute('points');
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        pts += `${e.offsetX},${e.offsetY} `;
        polyline.setAttribute('points', pts);
        this.lastPt = [e.offsetX, e.offsetY];
      }
      if (this.firstPt === null) {
        this.firstPt = this.lastPt;
      }
    };
  }

  createMouseEventRectangle() {
    const rect = document.querySelector('#rectangle');
    let ptsX = rect.getAttribute('x');
    let ptsY = rect.getAttribute('y');
    let rectWidth = rect.getAttribute('width');
    let rectHeight = rect.getAttribute('height');
    return (e: MouseEvent) => {
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        rectWidth = `${e.offsetX}`;
        rectHeight = `${e.offsetY}`;
        if (this.startDrawRectangle === true){
          ptsX = `${e.offsetX}`;
          ptsY = `${e.offsetY}`;
          this.startDrawRectangle = false;
        }
        this.rectangleDirection(Number.parseInt(ptsX), Number.parseInt(ptsY), Number.parseInt(rectWidth), Number.parseInt(rectHeight));
      }
    };
  }

  rectangleDirection(x, y, w, h){
    const rect = document.querySelector('#rectangle');

    if ((x < w) && (y < h)){ //Haut-Gauche vers Bas-Droit
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(w - x));
      rect.setAttribute('height', String(h - y));
    }
    else if ((x < w) && (y > h)){ //Bas-Gauche vers Haut-Droit
      rect.setAttribute('x', String(x));
      rect.setAttribute('y', String(h));
      rect.setAttribute('width', String(w - x));
      rect.setAttribute('height', String(y - h));
    }
    else if ((x > w) && (y < h)){ // Haut-Droit vers Bas-Gauche
      rect.setAttribute('x', String(w));
      rect.setAttribute('y', String(y));
      rect.setAttribute('width', String(x - w));
      rect.setAttribute('height', String(h - y));
    }
    else if ((x > w) && (y > h)){ // Bas-Droit vers Haut-Gauche
      rect.setAttribute('x', String(w));
      rect.setAttribute('y', String(h));
      rect.setAttribute('width', String(x - w));
      rect.setAttribute('height', String(y - h));
    }
  }

  createMouseEventCircle(){
    const circle = document.querySelector('#circle');
    let ptsX = circle.getAttribute('cx');
    let ptsY = circle.getAttribute('cy');
    return (e: MouseEvent) => {
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        this.lastPt = [e.offsetX, e.offsetY]
        if (this.startDrawCircle === true){
          ptsX = `${e.offsetX}`;
          ptsY = `${e.offsetY}`;
          this.startDrawCircle = false;
        }
      }
      circle.setAttribute('cx', ptsX);
      circle.setAttribute('cy', ptsY);
      circle.setAttribute('r', String(Math.abs(Number.parseInt(this.lastPt[0]) - Number.parseInt(ptsX))));
    };
  }

  createMouseDownEvent(mouseMove) {
    const svg = document.querySelector('#svg');
    return (e: MouseEvent) => {
      // svg.addEventListener('mousemove',mouseMove);
      svg.addEventListener('pointermove', mouseMove);
      //  svg.addEventListener('touchmove',mouseMove);
    }
  }

  createMouseUpEventPolyline(mouseMovePolyline) {
    const polyline = document.querySelector('#polyline');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMovePolyline);
      // svg.removeEventListener('touchmove',mouseMove);

      let pts = polyline.getAttribute('points');
      if (this.firstPt !== null) {
        pts += `${this.firstPt[0]},${this.firstPt[1]} `;
        polyline.setAttribute('points', pts);
      }
      this.firstPt = null;
      this.lastPt = null;

      const svgPathPoints: string[] = pts.replace(/,/g, ' ').split(' ');

      const svgPathPointsPercentage = [];
      for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i]) / this.width);
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i + 1]) / this.height);
      }
      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        polyline.setAttribute('points', '');

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });

    }
  }

  createMouseUpEventRectangle(mouseMoveRectangle) {
    const rect = document.querySelector('#rectangle');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMoveRectangle);
      // svg.removeEventListener('touchmove',mouseMove);

      let ptsX = rect.getAttribute('x');
      let ptsY = rect.getAttribute('y');
      let rectWidth = rect.getAttribute('width');
      let rectHeight = rect.getAttribute('height');

      this.firstPt = null;
      this.lastPt = null;

      let ptsRectWidth = String(Number.parseInt(rectWidth) + Number.parseInt(ptsX));
      let ptsRectHeight = String(Number.parseInt(rectHeight) + Number.parseInt(ptsY));

      const svgPathPoints = [];
      svgPathPoints.push(ptsX, ptsY, ptsRectWidth, ptsY, ptsRectWidth, ptsRectHeight, ptsX, ptsRectHeight, ptsX, ptsY);

      const svgPathPointsPercentage = [];
      for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i]) / this.width);
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i + 1]) / this.height);
      }

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        this.startDrawRectangle = true;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    }
  }

  circleToPolygon(cx, cy, r, nbIt){
    let coordinates: string = '';
    for (let i = 0; i < nbIt; ++i){
      let tmp = this.calculeCoordinates(cx, cy, r, (2 * Math.PI * i) / nbIt)
      coordinates += String(tmp[0]);
      coordinates += ',';
      coordinates += String(tmp[1]);
    }
    return coordinates;
  }

  calculeCoordinates(cx, cy, r, bearing){
    let tmpCx = this.toRadians(cx);
    let tmpCy = this.toRadians(cy);
    let roe = r / 6378137; // radius of the earth

    let Cy = Math.asin( Math.sin(tmpCy) * Math.cos(roe) + Math.cos(tmpCy) * Math.sin(roe) * Math.cos(bearing));
    let Cx = tmpCx + Math.atan2( Math.sin(bearing) * Math.sin(roe) * Math.cos(tmpCy), Math.cos(roe) - Math.sin(tmpCy) * Math.sin(Cy));

    return [this.toDegree(Cx), this.toDegree(Cy)];
  }

  toRadians(coordinate){
    return (coordinate * Math.PI) / 180;
  }

  toDegree(coordinate){
    return (coordinate * 180) / Math.PI;
  }

  createMouseUpEventCircle(mouseMoveCircle) {
    const circle = document.querySelector('#circle');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMoveCircle);
      // svg.removeEventListener('touchmove',mouseMove);

      this.firstPt = null;
      this.lastPt = null;

      let ptsCx = circle.getAttribute('cx');
      let ptsCy = circle.getAttribute('cy');
      let ptsCr = circle.getAttribute('r');

      const svgPathPoints: string[] = this.circleToPolygon(ptsCx, ptsCy, ptsCr, 10).replace(/,/g, ' ').split(' ');

      const svgPathPointsPercentage = [];
      for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i]) / this.width);
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i + 1]) / this.height);
      }

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        //dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        //dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', '1');
        this.startDrawCircle = true;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    }
  }

  static clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly, createMouseDownEventCircle, createMouseUpEventCirc){
    const svg = document.querySelector('#svg');

    svg.removeEventListener('pointerdown', createMouseDownEventRectangle);
    svg.removeEventListener('pointerup', createMouseUpEventRect);
    svg.removeEventListener('pointerdown', createMouseDownEventPolyline);
    svg.removeEventListener('pointerup', createMouseUpEventPoly);
    svg.removeEventListener('pointerdown', createMouseDownEventCircle);
    svg.removeEventListener('pointerup', createMouseUpEventCirc);
  }

  drawsSVG() {

      const svg = document.querySelector('#svg');

      svg.setAttribute('width', '' + this.width);
      svg.setAttribute('height', '' + this.height);

      let mouseMovePolyline = this.createMouseEventPolyline();
      let mouseMoveRectangle = this.createMouseEventRectangle();
      let mouseMoveCircle = this.createMouseEventCircle();

      let createMouseDownEventPolyline = this.createMouseDownEvent(mouseMovePolyline);
      let createMouseUpEventPoly = this.createMouseUpEventPolyline(mouseMovePolyline);

      let createMouseDownEventRectangle = this.createMouseDownEvent(mouseMoveRectangle);
      let createMouseUpEventRect = this.createMouseUpEventRectangle(mouseMoveRectangle);

      let createMouseDownEventCircle = this.createMouseDownEvent(mouseMoveCircle);
      let createMouseUpEventCirc = this.createMouseUpEventCircle(mouseMoveCircle);

      svg.addEventListener('pointerenter', (e: MouseEvent) =>{

        if (this.modeService.currentDrawingTool === 'Polyline' && this.DrawPolyline === false){
          this.DrawPolyline = true;
          this.DrawRectangle = false;
          this.DrawCircle = false;

          HotspotCreateComponent.clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly, createMouseDownEventCircle, createMouseUpEventCirc);

          //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
          svg.addEventListener('pointerdown', createMouseDownEventPolyline);
          //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

          //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
          svg.addEventListener('pointerup', createMouseUpEventPoly);
          //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
        }

        if (this.modeService.currentDrawingTool === 'Rectangle' && this.DrawRectangle === false) {
          this.DrawRectangle = true;
          this.DrawPolyline = false;
          this.DrawCircle = false;

          HotspotCreateComponent.clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly, createMouseDownEventCircle, createMouseUpEventCirc);

          //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
          svg.addEventListener('pointerdown', createMouseDownEventRectangle);
          //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

          //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
          svg.addEventListener('pointerup', createMouseUpEventRect);
          //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
        }
        else if (this.modeService.currentDrawingTool === 'Circle' && this.DrawCircle === false){
          this.DrawCircle = true;
          this.DrawPolyline = false;
          this.DrawRectangle = false;

          HotspotCreateComponent.clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly, createMouseDownEventCircle, createMouseUpEventCirc);

          //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
          svg.addEventListener('pointerdown', createMouseDownEventCircle);
          //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

          //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
          svg.addEventListener('pointerup', createMouseUpEventCirc);
          //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
        }
      });
  }

  // async drawSVG() {
  //   console.log('drawing is starting');
  //   this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height).polygon().draw();
  //
  //   this.drawing.on('drawstart', (event) => {
  //     const keyPressEvent = (e) => {
  //       if (e.key === 'Enter') {
  //         this.drawing.draw('done');
  //         this.drawing.off('drawstart');
  //
  //         const svgPathPoints = this.drawing.node.getAttribute('points')
  //           .replace(/,/g, ' ').split(' ');
  //         const svgPathPointsPercentage = [];
  //         for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
  //           svgPathPointsPercentage.push(svgPathPoints[i] / this.width);
  //           svgPathPointsPercentage.push(svgPathPoints[i + 1] / this.height);
  //         }
  //
  //         const dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
  //           width: '400px',
  //         });
  //         dialogRef.componentInstance.selectedScene = this.selectedScene;
  //         dialogRef.componentInstance.selectedImage = this.selectedImage;
  //         dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
  //
  //
  //         dialogRef.afterClosed().subscribe(result => {
  //           const cNode = this.hotspot.nativeElement.cloneNode(false);
  //           this.hotspot.nativeElement.parentNode.replaceChild(cNode, this.hotspot.nativeElement);
  //           this.updateHotspots.emit('');
  //           this.modeService.selectedMode = '';
  //           this.modeService.selectedMode = 'hotspot';
  //         });
  //
  //       } else if (e.key === 'Escape' || e.key === 'Esc') {
  //         this.drawing.draw('cancel');
  //       }
  //       document.removeEventListener('keypress', keyPressEvent);
  //     };
  //     document.addEventListener('keypress', keyPressEvent);
  //
  //   });
  //
  //   //
  //   this.drawing.node.setAttribute('stroke', '#000000');
  //   this.drawing.node.setAttribute('stroke-width', 2);
  //   // Filling the svg with a transparent color so the "onclick" attribute works in the middle.
  //   this.drawing.node.setAttribute('fill', '#000000');
  //   this.drawing.node.setAttribute('fill-opacity', '0.0');
  //   // this.drawing.node.setAttribute("onclick",'alert("You have clicked the svg element.")');
  //   this.drawing.on('drawstop', () => {
  //
  //   });
  // }

}
