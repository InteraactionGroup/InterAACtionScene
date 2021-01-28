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
  DrawPolyline = false;
  DrawRectangle = false;

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
    return (e: MouseEvent) => {
      let ptsX = rect.getAttribute('x');
      let ptsY = rect.getAttribute('y');
      let rectWidth = rect.getAttribute('width');
      let rectHeight = rect.getAttribute('height');
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        rectWidth = `${e.offsetX}`;
        rectHeight = `${e.offsetY}`;
        if (this.startDrawRectangle === true){
          ptsX = `${e.offsetX}`;
          ptsY = `${e.offsetY}`;
          this.startDrawRectangle = false;
        }
        rect.setAttribute('x', ptsX);
        rect.setAttribute('y', ptsY);
        rect.setAttribute('width', String(Number.parseInt(rectWidth) - Number.parseInt(ptsX)));
        rect.setAttribute('height', String(Number.parseInt(rectHeight) - Number.parseInt(ptsY)));
      }
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

        rect.setAttribute('x', '');
        rect.setAttribute('y', '');
        rect.setAttribute('width', '');
        rect.setAttribute('height', '');
        this.startDrawRectangle = true;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    }
  }

  clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly){
    const svg = document.querySelector('#svg');

    svg.removeEventListener('pointerdown', createMouseDownEventRectangle);
    svg.removeEventListener('pointerup', createMouseUpEventRect);
    svg.removeEventListener('pointerdown', createMouseDownEventPolyline);
    svg.removeEventListener('pointerup', createMouseUpEventPoly);
  }

  drawsSVG() {

      const svg = document.querySelector('#svg');

      svg.setAttribute('width', '' + this.width);
      svg.setAttribute('height', '' + this.height);

      let mouseMoveRectangle = this.createMouseEventRectangle();
      let mouseMovePolyline = this.createMouseEventPolyline();

      let createMouseDownEventRectangle = this.createMouseDownEvent(mouseMoveRectangle);
      let createMouseUpEventRect = this.createMouseUpEventRectangle(mouseMoveRectangle);

      let createMouseDownEventPolyline = this.createMouseDownEvent(mouseMovePolyline);
      let createMouseUpEventPoly = this.createMouseUpEventPolyline(mouseMovePolyline);

      svg.addEventListener('pointerenter', (e: MouseEvent) =>{

        if (this.modeService.currentDrawingTool === 'Rectangle' && this.DrawRectangle === false) {
          this.DrawRectangle = true;
          this.DrawPolyline = false;

          this.clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly);

          //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
          svg.addEventListener('pointerdown', createMouseDownEventRectangle);
          //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

          //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
          svg.addEventListener('pointerup', createMouseUpEventRect);
          //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
        }
        else if (this.modeService.currentDrawingTool === 'Polyline' && this.DrawPolyline === false){
          this.DrawPolyline = true;
          this.DrawRectangle = false;

          this.clearEventListener(createMouseDownEventRectangle, createMouseUpEventRect, createMouseDownEventPolyline, createMouseUpEventPoly);

          //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
          svg.addEventListener('pointerdown', createMouseDownEventPolyline);
          //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

          //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
          svg.addEventListener('pointerup', createMouseUpEventPoly);
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
