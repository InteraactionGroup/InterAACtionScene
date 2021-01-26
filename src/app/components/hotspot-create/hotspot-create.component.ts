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
  start = true;

  ngOnInit() {
    this.drawsSVG();
  }

  createMouseEvent() {
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

  createMouseEventRect() {
    const rect = document.querySelector('#rect');
    return (e: MouseEvent) => {
      let ptsX = rect.getAttribute('x');
      let ptsY = rect.getAttribute('y');
      let rectWidth = rect.getAttribute('width');
      let rectHeight = rect.getAttribute('height');
      if (e.offsetY !== undefined && e.offsetX !== undefined) {
        rectWidth = `${e.offsetX}`;
        rectHeight = `${e.offsetY}`;
        if (this.start == true){
          ptsX = `${e.offsetX}`;
          ptsY = `${e.offsetY}`;
          this.start = false;
        }
        let tmp = this.rectangle(ptsX, ptsY, rectWidth, rectHeight);
        rect.setAttribute('x', tmp[0]);
        rect.setAttribute('y', tmp[1]);
        rect.setAttribute('width', tmp[2]);
        rect.setAttribute('height', tmp[3]);
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

  createMouseUpEvent(mouseMove) {
    const polyline = document.querySelector('#polyline');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMove);
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

  createMouseUpEventRect(mouseMove) {
    const rect = document.querySelector('#rect');
    const svg = document.querySelector('#svg');

    return (e: MouseEvent) => {
      // svg.removeEventListener('mousemove',mouseMove);
      svg.removeEventListener('pointermove', mouseMove);
      // svg.removeEventListener('touchmove',mouseMove);

      this.firstPt = null;
      this.lastPt = null;

      let dialogRef;
      if(this.modeService.currentDrawingTool=='redraw') {
        dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.hotspot = this.modeService.modifyiedHotspot;

      } else {
        dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
      }

      dialogRef.afterClosed().subscribe(result => {

        rect.setAttribute('x', '');
        rect.setAttribute('y', '');
        rect.setAttribute('width', '');
        rect.setAttribute('height', '');
        this.start = true;

        this.updateHotspots.emit('');
        this.modeService.selectedMode = '';
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });

    }
  }

  rectangle(ptsX, ptsY, rectWidth, rectHeight){
    if (ptsX < rectWidth && ptsY > rectHeight){ // Bas Gauche -> Haut Droit
      let tmpY = ptsY;
      ptsY = rectHeight;
      rectHeight = tmpY - ptsY;
      rectWidth = rectWidth - ptsX;
    }
    else if (ptsX > rectWidth && ptsY < rectHeight){ // Haut Droit -> Bas Gauche
      let tmpX = ptsX;
      ptsX = rectWidth;
      rectWidth = tmpX - ptsX;
      rectHeight = rectHeight - ptsY;
    }
    else if (ptsX > rectWidth && ptsY > rectHeight){ // Bas Droit -> Haut Gauche
      let tmpX = ptsX;
      let tmpY = ptsY;
      ptsX = rectWidth;
      rectWidth = tmpX - ptsX;
      ptsY = rectHeight;
      rectHeight = tmpY - ptsY;
    }
    else{ // Haut Gauche -> Bas Droit
      rectWidth = rectWidth - ptsX;
      rectHeight = rectHeight - ptsY;
    }

    return [ptsX, ptsY, Math.abs(rectWidth), Math.abs(rectHeight)];
  }

  drawsSVG() {
      const svg = document.querySelector('#svg');;

      svg.setAttribute('width', '' + this.width);
      svg.setAttribute('height', '' + this.height);

    if (this.modeService.currentDrawingTool === 'Rectangle') {
      let mouseMove = this.createMouseEventRect();
      //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
      svg.addEventListener('pointerdown', this.createMouseDownEvent(mouseMove));
      //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

      //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
      svg.addEventListener('pointerup', this.createMouseUpEventRect(mouseMove));
      //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
    }
    else if (this.modeService.currentDrawingTool === 'Polyline'){
      let mouseMove = this.createMouseEvent();
      //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
      svg.addEventListener('pointerdown', this.createMouseDownEvent(mouseMove));
      //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

      //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
      svg.addEventListener('pointerup', this.createMouseUpEvent(mouseMove));
      //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
    }
  }

  /*

  drawsSVG() {
    const svg = document.querySelector('#svg');

    svg.setAttribute('width', '' + this.width);
    svg.setAttribute('height', '' + this.height);

    let mouseMove = this.createMouseEvent();
    //  svg.addEventListener('mousedown', this.createMouseDownEvent(mouseMove));
    svg.addEventListener('pointerdown', this.createMouseDownEvent(mouseMove));
    //  svg.addEventListener('touchdown', this.createMouseDownEvent(mouseMove));

    //  svg.addEventListener('mouseup', this.createMouseUpEvent(mouseMove));
    svg.addEventListener('pointerup', this.createMouseUpEvent(mouseMove));
    //  svg.addEventListener('touchend', this.createMouseUpEvent(mouseMove));
  }

*/

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
