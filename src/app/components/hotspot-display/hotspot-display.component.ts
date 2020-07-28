import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { ScenesService } from '../../services/scenes.service';
import { Hotspot } from '../../types';
declare const SVG: any;
@Component({
  selector: 'app-hotspot-display',
  templateUrl: './hotspot-display.component.html',
  styleUrls: ['./hotspot-display.component.css']
})
export class HotspotDisplayComponent implements OnInit {

  drawing: any;
  hotspots: Array<Hotspot>;
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
  ) { }

  ngOnInit(): void {
  }

  initializeHotspot(): void {
    this.hotspots = this.scenesService.getImageHotspots(this.selectedScene,this.selectedImage);
    this.hotspot.nativeElement.innerHTML = "";
    // var cNode = this.hotspot.nativeElement.cloneNode(false);
    // this.hotspot.nativeElement.parentNode.replaceChild(cNode, this.hotspot.nativeElement);
    if (this.hotspots != null && this.hotspots.length > 0) {
      this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height);
      for(let i=0; i < this.hotspots.length; i++){
        let pathStr = "";

        for (let j = 0; j < this.hotspots[i].svgPointArray.length-1; j=j+2) {
          pathStr += (this.hotspots[i].svgPointArray[j] * this.width).toString() + ",";
          pathStr += (this.hotspots[i].svgPointArray[j+1] * this.height).toString() + " ";
        }

        let poly = this.drawing.polygon(pathStr).attr({ fill: '#000000',
                                                              'fill-opacity': 0.0,
                                                              stroke: this.hotspots[i].strokeColor,
                                                              'stroke-width': 2 } );
        let enterEvent = (e:Event) => {
          poly.node.setAttribute("fill", this.hotspots[i].strokeColor);
          poly.node.setAttribute('fill-opacity', "0.5");
        };

        let leaveEvent = (e:Event) => {
          poly.node.setAttribute("fill", '#000000');
          poly.node.setAttribute('fill-opacity', "0.0");
        };

        poly.node.addEventListener("click", (e:Event) => this.PlayAudio(i));
        poly.node.addEventListener("mouseenter", enterEvent);
        poly.node.addEventListener("mouseleave", leaveEvent);
        poly.node.addEventListener("touchenter", enterEvent);
        poly.node.addEventListener("touchleave", leaveEvent);
      }
    }

  }

  PlayAudio(id: number) {
    let audio = new Audio(this.hotspots[id].base64sound);
    audio.load();
    audio.play();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
