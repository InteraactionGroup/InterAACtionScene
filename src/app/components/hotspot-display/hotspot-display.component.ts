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
  @ViewChild("hotspot", { static: true }) hotspot: ElementRef;

  constructor(
    public scenesService: ScenesService,
    private dialog: MatDialog,
    public modeService: ModeService
  ) {
  }

  getHotspots(){
    if(this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage) != null && this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage).length>0) {
      return this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage)
    } else {
      return [];
    }
  }

  getPoints(hotspot: Hotspot){
    let pathStr = "";
      for (let j = 0; j < hotspot.svgPointArray.length - 1; j = j + 2) {
        pathStr += (hotspot.svgPointArray[j] * this.width).toString() + ",";
        pathStr += (hotspot.svgPointArray[j + 1] * this.height).toString() + " ";
      }
     return pathStr
  }

  ngOnInit(): void {
  }

  PlayAudio(hotspot: Hotspot) {
    let audio = new Audio(hotspot.base64sound);
    audio.load();
    audio.play();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  enterEvent(event, hotspot){
      event.target.setAttribute("fill", hotspot.strokeColor);
    event.target.setAttribute('fill-opacity', "0.5");
    };

  leaveEvent(event){
    event.target.setAttribute("fill", '#000000');
    event.target.setAttribute('fill-opacity', "0.0");
    };

  clickEvent(event, hotspot){
      if(this.modeService.selectedMode==='hotspot' && this.modeService.currentDrawingTool === 'modify'){
        const dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
          width: '400px',
        });
        dialogRef.componentInstance.selectedScene = this.selectedScene;
        dialogRef.componentInstance.selectedImage = this.selectedImage;
        dialogRef.componentInstance.poly =  event.target;
        dialogRef.componentInstance.hotspot = hotspot;

        dialogRef.afterClosed().subscribe(result => {
          this.modeService.selectedMode = '';
          this.modeService.selectedMode = 'hotspot';
        });
      } else {
        this.PlayAudio(hotspot)
      }
    };

  getColor(index){
    if (this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage) !== undefined && this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage).length > index) {
      return this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage)[index].strokeColor;
    }
    return'black'
  }
}
