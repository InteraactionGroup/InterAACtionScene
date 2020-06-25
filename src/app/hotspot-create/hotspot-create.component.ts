import { Component, OnInit ,Input,Output,EventEmitter,ViewChild,ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScenesService } from '../scenes.service';
import { HotspotCreateDialogComponent } from '../hotspot-create-dialog/hotspot-create-dialog.component';
declare const SVG: any;

@Component({
  selector: 'app-hotspot-create',
  templateUrl: './hotspot-create.component.html',
  styleUrls: ['./hotspot-create.component.css']
})

export class HotspotCreateComponent implements OnInit  {

  drawing: any;
  @Input() public width : number;
  @Input() public height : number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @Input() public currImage: number;
  @ViewChild("hotspot", { static: true }) hotspot: ElementRef;
  @Output() updateHotspots = new EventEmitter<string>();

  constructor(
    private scenesService: ScenesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.drawSVG();
  }

  async drawSVG() {
    this.drawing = SVG(this.hotspot.nativeElement).size(this.width, this.height).polygon().draw();
    this.drawing.on('drawstart', (e) => {
        document.addEventListener('keydown', (e) => {
            if(e.keyCode == 13){
                this.drawing.draw('done');
                this.drawing.off('drawstart');
                //
                const dialogRef = this.dialog.open(HotspotCreateDialogComponent, {
                  width: '400px',
                });
                dialogRef.componentInstance.selectedScene = this.selectedScene;
                dialogRef.componentInstance.selectedImage = this.selectedImage;
                dialogRef.componentInstance.svgPath = this.drawing.node.getAttribute("points");
                dialogRef.afterClosed().subscribe(result => {
                  var cNode = this.hotspot.nativeElement.cloneNode(false);
                  this.hotspot.nativeElement.parentNode.replaceChild(cNode, this.hotspot.nativeElement);
                  this.updateHotspots.emit("");
                });

            } else if (e.keyCode == 27) {
                this.drawing.draw('cancel');
            }
        });
    });

    //
    this.drawing.node.setAttribute("stroke",'#000000');
    this.drawing.node.setAttribute("stroke-width",2);
    // Filling the svg with a transparent color so the "onclick" attribute works in the middle.
    this.drawing.node.setAttribute("fill",'#000000');
    this.drawing.node.setAttribute("fill-opacity",0.0);
    //this.drawing.node.setAttribute("onclick",'alert("You have clicked the svg element.")');
    this.drawing.on('drawstop', () => {

    });
  }

}
