import { Component, OnInit , Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { ScenesService } from '../../services/scenes.service';
import { HotspotCreateDialogComponent } from '../hotspot-create-dialog/hotspot-create-dialog.component';
import {ModeService} from "../../services/mode.service";
declare const SVG: any;

@Component({
  selector: 'app-hotspot-create',
  templateUrl: './hotspot-create.component.html',
  styleUrls: ['./hotspot-create.component.css']
})

export class HotspotCreateComponent implements OnInit  {

  drawing: any;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @Input() public currImage: number;
  @ViewChild('hotspot', { static: true }) hotspot: ElementRef;
  @Output() updateHotspots = new EventEmitter<string>();

  constructor(
    private scenesService: ScenesService,
    private dialog: MatDialog, private modeService: ModeService
  ) { }

  ngOnInit() {
    this.drawSVG();
  }

  async drawSVG() {
    console.log("drawing is starting");
    this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height).polygon().draw();

    this.drawing.on('drawstart', (event) => {
      let keyPressEvent = (e) => {
        if (e.key === "Enter") {
          this.drawing.draw('done');
          this.drawing.off('drawstart');
          //
          console.log(this.width);
          console.log(this.height);

          const svgPathPoints = this.drawing.node.getAttribute('points').replace(/,/g, ' ').split(' ');
          const svgPathPointsPercentage = [];
          for (let i = 0; i < svgPathPoints.length - 1; i = i + 2) {
            svgPathPointsPercentage.push(svgPathPoints[i] / this.width);
            svgPathPointsPercentage.push(svgPathPoints[i + 1] / this.height);
          }

          const dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
            width: '400px',
          });
          dialogRef.componentInstance.selectedScene = this.selectedScene;
          dialogRef.componentInstance.selectedImage = this.selectedImage;
          dialogRef.componentInstance.svgPath = svgPathPointsPercentage;


          dialogRef.afterClosed().subscribe(result => {
            const cNode = this.hotspot.nativeElement.cloneNode(false);
            this.hotspot.nativeElement.parentNode.replaceChild(cNode, this.hotspot.nativeElement);
            this.updateHotspots.emit('');
            this.modeService.selectedMode = '';
            this.modeService.selectedMode = 'hotspot';
          });

        } else if (e.key === "Escape" || e.key === "Esc") {
          this.drawing.draw('cancel');
        }
        document.removeEventListener('keypress', keyPressEvent);
      };
      document.addEventListener('keypress', keyPressEvent);

    });

    //
    this.drawing.node.setAttribute('stroke', '#000000');
    this.drawing.node.setAttribute('stroke-width', 2);
    // Filling the svg with a transparent color so the "onclick" attribute works in the middle.
    this.drawing.node.setAttribute('fill', '#000000');
    this.drawing.node.setAttribute('fill-opacity', "0.0");
    // this.drawing.node.setAttribute("onclick",'alert("You have clicked the svg element.")');
    this.drawing.on('drawstop', () => {

    });
  }

}
