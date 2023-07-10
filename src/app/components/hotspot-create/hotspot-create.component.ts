import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ScenesService} from '../../services/scenes.service';
import {HotspotCreateDialogComponent} from '../hotspot-create-dialog/hotspot-create-dialog.component';
import {ModeService} from '../../services/mode.service';
import {HotspotModifyDialogComponent} from "../hotspot-modify-dialog/hotspot-modify-dialog.component";
import {Hotspot} from "../../types";
import {FormGroup} from "@angular/forms";
import {element} from "protractor";

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
    public scenesService: ScenesService,
    private dialog: MatDialog, public modeService: ModeService) {
  }

  lastPt = null;
  firstPt = null;
  startDrawPolyline = true;
  startDrawRectangle = true;
  startDrawCircle = true;
  DrawPolyline = false;
  DrawRectangle = false;
  DrawCircle = false;
  milieuCircle = null;
  milieuRectangle = null;
  milieuPolyline = null;
  listePoints = [];

  xMin = null;
  xMax = null;
  yMin = null;
  yMax = null;

  ngOnInit() {
    this.drawsSVG();
  }

  /**
   * Permet de tracer un hotspot d'une forme libre
   */
  createMouseEventPolyline() {
    const polyline = document.querySelector('#polyline');
    return (e: MouseEvent) => {
      let pts = polyline.getAttribute('points');
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        pts += `${e.offsetX},${e.offsetY} `;
        polyline.setAttribute('points', pts);
        this.lastPt = [e.offsetX, e.offsetY];
        this.listePoints.push(e.offsetX);
        this.listePoints.push(e.offsetY);
      }
      if (this.firstPt === null) {
        this.firstPt = this.lastPt;
        this.xMin = this.xMax = this.lastPt[0];
        this.yMin = this.yMax = this.lastPt[1];
      }
      this.calculeMilieuPolyline();
    };
  }

  calculeMilieuPolyline(){

    if (Number.parseInt(this.lastPt[0]) < this.xMin){
      this.xMin = Number.parseInt(this.lastPt[0]);
    }
    if (Number.parseInt(this.lastPt[1]) < this.yMin){
      this.yMin = Number.parseInt(this.lastPt[1]);
    }
    if (Number.parseInt(this.lastPt[0]) > this.xMax){
      this.xMax = Number.parseInt(this.lastPt[0]);
    }
    if (Number.parseInt(this.lastPt[1]) > this.yMax){
      this.yMax = Number.parseInt(this.lastPt[1]);
    }
    this.milieuPolyline = [((this.xMin + this.xMax) / 2), ((this.yMin + this.yMax) / 2)];
  }

  /**
   * Permet de tracer un hotspot sous la forme d'un rectangle
   */
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

        this.milieuRectangle = [((Number.parseInt(rectWidth) + Number.parseInt(ptsX)) / 2), ((Number.parseInt(rectHeight) + Number.parseInt(ptsY)) / 2)];

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

  /**
   * Permet de tracer un hotspot sous la forme d'un cercle
   */
  createMouseEventCircle(){
    const circle = document.querySelector('#circle');
    let ptsX = circle.getAttribute('cx');
    let ptsY = circle.getAttribute('cy');
    return (e: MouseEvent) => {
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        this.lastPt = [e.offsetX, e.offsetY];
        if (this.startDrawCircle === true){
          ptsX = `${e.offsetX}`;
          ptsY = `${e.offsetY}`;
          this.startDrawCircle = false;
        }
      }

      this.milieuCircle = [((Number.parseInt(this.lastPt[0]) + Number.parseInt(ptsX)) / 2), ((Number.parseInt(this.lastPt[1]) + Number.parseInt(ptsY)) / 2)];

      circle.setAttribute('cx', String(this.milieuCircle[0]));
      circle.setAttribute('cy', String(this.milieuCircle[1]));
      circle.setAttribute('r',
        String(Math.sqrt(
          Math.pow(Number.parseInt(this.lastPt[0]) - this.milieuCircle[0],2)
          + Math.pow(Number.parseInt(this.lastPt[1]) - this.milieuCircle[1],2))));
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

  /**
   * Permet de tracer un hotspot sous la forme d'un polygone et d'ouvrir la fenêtre de création ou de modification d'un hotspot
   * @param mouseMovePolyline objet renvoyé par la fonction createMouseEventPolyline
   */
  createMouseUpEventPolyline(mouseMovePolyline) {
    const polyline = document.querySelector('#polyline');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMovePolyline);
      // svg.removeEventListener('touchmove',mouseMove);

      this.listePoints.push(this.firstPt[0]);
      this.listePoints.push(this.firstPt[1]);

      let tabPtsYCenter = [];
      let tabPtsXCenter = [];

      for (let i = 0; i < this.listePoints.length - 2; i = i + 2) {
        if ((this.listePoints[i] <= this.milieuPolyline[0]) && this.listePoints[i + 2] >= this.milieuPolyline[0]) {
          tabPtsXCenter.push((this.listePoints[i] + this.listePoints[i+2]) / 2);
          tabPtsYCenter.push((this.listePoints[i+1] + this.listePoints[i+3]) /2);
        }
        if ((this.listePoints[i] >= this.milieuPolyline[0]) && this.listePoints[i + 2] <= this.milieuPolyline[0]) {
          tabPtsXCenter.push((this.listePoints[i] + this.listePoints[i+2]) / 2);
          tabPtsYCenter.push((this.listePoints[i+1] + this.listePoints[i+3]) /2);
        }
      }

      tabPtsXCenter.sort(function (a,b){
        return a - b;
      });
      tabPtsYCenter.sort(function (a,b){
        return a - b;
      });

      let ptsXCenter = (tabPtsXCenter[0] + tabPtsXCenter[1]) / 2;
      let ptsYCenter = (tabPtsYCenter[0] + tabPtsYCenter[1]) / 2;

      let pts = polyline.getAttribute('points');
      /* istanbul ignore next */
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

      const svgPathCenter = this.circlePoints(ptsXCenter, ptsYCenter, 1);

      const svgPathCenterPointsPercentage = [];
      for (let i = 0; i < svgPathCenter.length - 1; i = i + 2) {
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i]) / this.width);
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i + 1]) / this.height);
      }

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        // Si l'utilisateur est entrain de redessiner un hotspot, ouvre la fenêtre de modification
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        // Si l'utilisateur est entrain de dessiner un nouveau hotspot, ouvre la fenêtre de création
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        if (this.scenesService.haveAddHotspot === true){
          if (this.scenesService.typeHotspot === 'soundAudio' || this.scenesService.typeHotspot === 'writeAudio') {
            this.scenesService.addHotspotSound(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.soundHotspot);
          } else if (this.scenesService.typeHotspot === 'refImage') {
            this.scenesService.addHotspotImage(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.imageHotspot);
          }

          this.scenesService.haveAddHotspot = false;
        }

        polyline.setAttribute('points', '');
        this.startDrawPolyline = true;
        this.milieuPolyline = null;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    }
  }

  /**
   * Permet de tracer un hotspot sous la forme d'un rectangle et d'ouvrir la fenêtre de création ou de modification du hotspot
   * @param mouseMoveRectangle objet renvoyé par la fonction createMouseEventRectangle
   */
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

      const svgPathCenter = this.circlePoints(this.milieuRectangle[0], this.milieuRectangle[1], 1);

      const svgPathCenterPointsPercentage = [];
      for (let i = 0; i < svgPathCenter.length - 1; i = i + 2) {
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i]) / this.width);
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i + 1]) / this.height);
      }

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        // Si l'utilisateur est entrain de redessiner un hotspot, ouvre la fenêtre de modification
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        // Si l'utilisateur est entrain de dessiner un nouveau hotspot, ouvre la fenêtre de création
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        if (this.scenesService.haveAddHotspot === true){
          if (this.scenesService.typeHotspot === 'soundAudio' || this.scenesService.typeHotspot === 'writeAudio') {
            this.scenesService.addHotspotSound(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.soundHotspot);
          } else if (this.scenesService.typeHotspot === 'refImage') {
            this.scenesService.addHotspotImage(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.imageHotspot);
          }

          this.scenesService.haveAddHotspot = false;
        }

        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', '1');
        rect.setAttribute('height', '1');
        this.startDrawRectangle = true;
        this.milieuRectangle = null;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    }
  }

  circlePoints(ptsCx, ptsCy, ptsCr){
    let listePoints = [];
    listePoints.push(String(ptsCx));
    listePoints.push(String(Number.parseInt(ptsCy) - Number.parseInt(ptsCr)));

    let listePointsTmpBasDroit = [];
    let listePointsTmpBasGauche = [];
    let listePointsTmpHautGauche = [];

    for (let i = 1; i <= Number.parseInt(ptsCr); i++){
      let Cx = Number.parseInt(ptsCx) + i;
      let Cy = (this.calculeCyCircle(Number.parseInt(ptsCx), Number.parseInt(ptsCy), Number.parseInt(ptsCr), Cx));

      listePoints.push(String(Cx));
      listePoints.push(String(Cy[0]));

      listePointsTmpBasDroit.unshift(String(Cy[1]));
      listePointsTmpBasDroit.unshift(String(Cx));

      listePointsTmpBasGauche.push(String(Cx - (2 * i)));
      listePointsTmpBasGauche.push(String(Cy[1]));

      listePointsTmpHautGauche.unshift(String(Cy[0]));
      listePointsTmpHautGauche.unshift(String(Cx - (2 * i)));
    }

    listePointsTmpBasDroit.forEach(element1 => listePoints.push(element1));
    listePointsTmpBasGauche.forEach(element2 => listePoints.push(element2));
    listePointsTmpHautGauche.forEach(element3 => listePoints.push(element3));

    listePoints.push(String(ptsCx));
    listePoints.push(String(Number.parseInt(ptsCy) - Number.parseInt(ptsCr)));

    return listePoints;
  }

  calculeCyCircle(ptsCx, ptsCy, ptsCr, Cx){

    let pt1X = ptsCx + ptsCr;
    let pt1Y = ptsCy;

    let pt2X = ptsCx - ptsCr;
    let pt2Y = ptsCy;

    let a = 1;
    let b = -2 * ptsCy;
    let c = (pt2X - Cx) * (pt1X - Cx ) + (pt1Y * pt2Y);

    let discriminant = Math.pow(b, 2) - (4 * a * c);

    let x1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    let x2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    return [x1, x2];
  }

  /**
   * Permet de tracer un hotspot sous la forme d'un cercle et d'ouvrir la fenêtre de création ou de modification du hotspot
   * @param mouseMoveCircle objet renvoyé par la fonction createMouseEventCircle
   */
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

      const svgPathPoints = this.circlePoints(ptsCx, ptsCy, ptsCr);

      const svgPathPointsPercentage = [];
      for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i]) / this.width);
        svgPathPointsPercentage.push(Number.parseInt(svgPathPoints[i + 1]) / this.height);
      }

      const svgPathCenter = this.circlePoints(this.milieuCircle[0], this.milieuCircle[1], 1);

      const svgPathCenterPointsPercentage = [];
      for (let i = 0; i < svgPathCenter.length - 1; i = i + 2) {
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i]) / this.width);
        svgPathCenterPointsPercentage.push(Number.parseInt(svgPathCenter[i + 1]) / this.height);
      }

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        // Si l'utilisateur est entrain de redessiner un hotspot, ouvre la fenêtre de modification
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        // Si l'utilisateur est entrain de dessiner un nouveau hotspot, ouvre la fenêtre de création
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.svgPath = svgPathPointsPercentage;
      }

      dialogRef.afterClosed().subscribe(result => {

        if (this.scenesService.haveAddHotspot === true){
          if (this.scenesService.typeHotspot === 'soundAudio' || this.scenesService.typeHotspot === 'writeAudio') {
            this.scenesService.addHotspotSound(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.soundHotspot);
          } else if (this.scenesService.typeHotspot === 'refImage') {
            this.scenesService.addHotspotImage(this.selectedScene,
              this.selectedImage,
              this.scenesService.nameHotspot.concat('', 'Center'),
              svgPathCenterPointsPercentage,
              this.scenesService.colorHotspot,
              this.scenesService.typeHotspot,
              this.scenesService.strokeWidth,
              this.scenesService.imageHotspot);
          }

          this.scenesService.haveAddHotspot = false;
        }

        circle.setAttribute('cx', '0');
        circle.setAttribute('cy', '0');
        circle.setAttribute('r', '1');
        this.startDrawCircle = true;
        this.milieuCircle = null;

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

        if (this.modeService.choiceDrawing === 'Polyline' && this.DrawPolyline === false){
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

        else if (this.modeService.choiceDrawing === 'Rectangle' && this.DrawRectangle === false) {
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
        else if (this.modeService.choiceDrawing === 'Circle' && this.DrawCircle === false){
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
}
