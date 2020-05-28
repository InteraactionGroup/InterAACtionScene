import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { ScenesService } from '../scenes.service';
declare const SVG: any;

@Component({
  selector: 'app-hotspot-create',
  templateUrl: './hotspot-create.component.html',
  styleUrls: ['./hotspot-create.component.css']
})

export class HotspotCreateComponent implements OnInit {

  drawing: any;
  @Input() public width : number;
  @Input() public height : number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @Input() public currImage: number;
  @ViewChild("hotspot", { static: true }) hotspot: ElementRef;

  constructor(
    private scenesService: ScenesService
  ) { }

  ngOnInit(): void {
    this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height).polygon().draw();
    this.drawing.on('drawstart', (e) => {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode == 13){
                this.drawing.draw('done');
                this.drawing.off('drawstart');
            }
        });
    });
    console.log(this.drawing);
    console.log(this.width);

    //
    this.drawing.node.setAttribute("stroke",'#000000');
    this.drawing.node.setAttribute("stroke-width",1);
    this.drawing.node.setAttribute("fill",'none');

    this.drawing.on('drawstop', function(){
        // remove listener
        console.log(this.drawing);
    });


    // this.drawing = svg(this.hotspot.nativeElement).size(this.width, this.height);
    // let rect = this.drawing.rect(10, 10);
    // let path = this.drawing.path("M 340,178 104,478 900,490 Z");
    // let length = path.length();
    //
    // path.fill('none').stroke({width:5, color: '#000'}).move(10,10).scale(0.5);
    // path.animate(3000).rotate(365).loop();
    //
    // rect.animate(5000, '<>').during(function(pos, morph, eased){
    //     var m = path.matrixify()
    //     var p = new svg.Point(path.pointAt(eased * length)).transform(m)
    //     rect.move(p.x, p.y)
    // }).loop(true, true);
  }

}
