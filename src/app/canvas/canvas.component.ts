import {  Component, Input,Output,EventEmitter, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


   reader = new FileReader();
   canvasD : string;
   @ViewChild('canvas') public canvas: ElementRef;
   @Input() public width : number;
   @Input() public height : number;
   @Input() public set canvasData (canvasD: string) {
     this.canvasD = canvasD;
     this.InitializeCanvasWithJSON();
   };
   @Input() public set imageChange(imageChange: number) {
      this.saveCanvas();
      this.ngAfterViewInit();
      this.InitializeCanvasWithJSON();
  }

  InitializeCanvasWithJSON() {
    if (this.canvasD != null) {
      var data = JSON.parse(this.canvasD);
      var image = new Image();
      image.src = data.image; // data.image contains the data URL
      image.onload;
      this.cx.clearRect(0, 0, this.width, this.height);
      this.cx.drawImage(image, 0, 0); // draw the new image to the screen

    }
  }

   @Input() public set currentDrawingTool(drawingTool: string) {
     this.cx.globalCompositeOperation="source-over";
     switch(drawingTool) {
       case "white": {
          this.cx.strokeStyle = "#FFFFFF"
          break;
       }
       case "black": {
          this.cx.strokeStyle = "#000000"
          break;
       }
       case "red": {
          this.cx.strokeStyle = "#f34336"
          break;
       }
       case "orange": {
          this.cx.strokeStyle = "#ff7f00"
          break;
       }
       case "blue": {
          this.cx.strokeStyle = "#0080ff"
          break;
       }
       case "green": {
          this.cx.strokeStyle = "#228b22"
          break;
       }
       case "clear": {
          this.cx.clearRect(0, 0, this.width, this.height);
          break;
       }
       case "erase": {
          this.cx.globalCompositeOperation="destination-out";
          break;
       }
       default: {
          this.cx.strokeStyle = "#000000"
          break;
       }
     }
   }
   @Output() canvasSave = new EventEmitter<string>();

   private cx: CanvasRenderingContext2D;

   public ngAfterViewInit() {
     const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
     this.cx = canvasEl.getContext('2d');

     canvasEl.width = this.width;
     canvasEl.height = this.height;

     this.cx.lineWidth = 6;
     this.cx.lineCap = 'round';
     this.cx.strokeStyle = "#FFF";

     this.captureEvents(canvasEl);
     this.InitializeCanvasWithJSON();
   }

   public saveCanvas() {
     var canvasContents = this.canvas.nativeElement.toDataURL(); // a data URL of the current canvas image
     var data = { image: canvasContents, date: Date.now() };
     var string = JSON.stringify(data);
     this.canvasSave.emit(string);
   }

   private captureEvents(canvasEl: HTMLCanvasElement) {
     // Captures all mouse down events
     fromEvent(canvasEl, 'mousedown')
       .pipe(
         switchMap((e) => {
           // After mouse down, it starts drawing a line
           return fromEvent(canvasEl, 'mousemove')
             .pipe(
               // The line stops when the mouse is released or leaves the area
               takeUntil(fromEvent(canvasEl, 'mouseup')),
               takeUntil(fromEvent(canvasEl, 'mouseleave')),
               pairwise()
             )
         })
       )
       .subscribe((res: [MouseEvent, MouseEvent]) => {
         const rect = canvasEl.getBoundingClientRect();

         // Previous and current position with the offset
         const prevPos = {
           x: res[0].clientX - rect.left,
           y: res[0].clientY - rect.top
         };

         const currentPos = {
           x: res[1].clientX - rect.left,
           y: res[1].clientY - rect.top
         };

         // This method does the actual drawing
         this.drawOnCanvas(prevPos, currentPos);
       });
   }

   private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
     if (!this.cx) { return; }

     this.cx.beginPath();

     if (prevPos) {
       this.cx.moveTo(prevPos.x, prevPos.y); // from
       this.cx.lineTo(currentPos.x, currentPos.y);
       this.cx.stroke();
     }
   }
}
