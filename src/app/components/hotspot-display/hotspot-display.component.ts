import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { ScenesService } from '../../services/scenes.service';
import { Hotspot } from '../../types';
import {ModeService} from "../../services/mode.service";
import {HotspotCreateDialogComponent} from "../hotspot-create-dialog/hotspot-create-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {HotspotModifyDialogComponent} from "../hotspot-modify-dialog/hotspot-modify-dialog.component";
declare const SVG: any;
@Component({
  selector: 'app-hotspot-display',
  templateUrl: './hotspot-display.component.html',
  styleUrls: ['./hotspot-display.component.css']
})
export class HotspotDisplayComponent implements OnInit {

  drawing: any;
  @Input() public width : number;
  @Input() public height : number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @Input() public set currImage(currImage: number) {
    (async () => {
      await this.delay(40);
      this.initializeHotspot();
    })();
  }
  @ViewChild("hotspot", { static: true }) hotspot: ElementRef;

  constructor(
    private scenesService: ScenesService,
    private dialog: MatDialog,
    private modeService: ModeService
  ) { }

  ngOnInit(): void {
  }

  initializeHotspot(): void {
    this.modeService.hotspots = this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage);
    this.hotspot.nativeElement.innerHTML = "";
    // var cNode = this.hotspot.nativeElement.cloneNode(false);
    // this.hotspot.nativeElement.parentNode.replaceChild(cNode, this.hotspot.nativeElement);
    if (this.modeService.hotspots != null && this.modeService.hotspots.length > 0) {
      this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height);
      for(let i=0; i < this.modeService.hotspots.length; i++){
        let pathStr = "";

        for (let j = 0; j < this.modeService.hotspots[i].svgPointArray.length-1; j=j+2) {
          pathStr += (this.modeService.hotspots[i].svgPointArray[j] * this.width).toString() + ",";
          pathStr += (this.modeService.hotspots[i].svgPointArray[j+1] * this.height).toString() + " ";
        }

        let poly = this.drawing.polygon(pathStr).attr({ fill: '#000000',
                                                        'fill-opacity': 0.0,
                                                        stroke: this.modeService.hotspots[i].strokeColor,
                                                        'stroke-width': 2 } );
        let enterEvent = (e:Event) => {
          poly.node.setAttribute("fill", this.modeService.hotspots[i].strokeColor);
          poly.node.setAttribute('fill-opacity', "0.5");
        };

        let leaveEvent = (e:Event) => {
          poly.node.setAttribute("fill", '#000000');
          poly.node.setAttribute('fill-opacity', "0.0");
        };

        poly.node.addEventListener("click", (e:Event) => {
          if(this.modeService.selectedMode==='hotspot' && this.modeService.currentDrawingTool === 'modify'){
            const dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
              width: '400px',
            });
            dialogRef.componentInstance.selectedScene = this.selectedScene;
            dialogRef.componentInstance.selectedImage = this.selectedImage;
            dialogRef.componentInstance.poly = poly;
            dialogRef.componentInstance.index = i;

            dialogRef.afterClosed().subscribe(result => {
              this.modeService.selectedMode = '';
              this.modeService.selectedMode = 'hotspot';
            });
          } else {
            this.PlayAudio(i)
          }
        });
        poly.node.addEventListener("mouseenter", enterEvent);
        poly.node.addEventListener("mouseleave", leaveEvent);
        poly.node.addEventListener("touchenter", enterEvent);
        poly.node.addEventListener("touchleave", leaveEvent);
      }
    }

  }

  PlayAudio(id: number) {
    let audio = new Audio(this.modeService.hotspots[id].base64sound);
    audio.load();
    audio.play();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
