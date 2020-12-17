import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from '../../services/mode.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(private scenesService: ScenesService, public modeService: ModeService) {
  }

  ngOnInit(): void {
    this.InitializeCanvasWithJSON();
  }

  prevPos = {x: null, y: null};
  currentPos = {x: null, y: null};
  drawStarted = false;

  @ViewChild('canvas') public canvas: ElementRef;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  previousSelectedScene = 0;
  previousSelectedImage = 0;
  @Output() updateCanvas = new EventEmitter<string>();

  @Input() public canvasD: string;

  @Input()
  public set imageChange(imageChange: number) {
    (async () => {
      if (this.cx != undefined) {
        this.saveCanvas();
      }
      await this.delay(10);
      this.ngAfterViewInit();
      this.InitializeCanvasWithJSON();
    })();
  }

  InitializeCanvasWithJSON() {
    if (this.canvasD != null) {
      const data = JSON.parse(this.canvasD);
      const image = new Image();
      image.src = data.image; // data.image contains the data URL
      image.onload = () => {
        this.cx.clearRect(0, 0, this.width, this.height);
        this.cx.drawImage(image, 0, 0); // draw the new image to the screen
      };
    }
  }

  @Input()
  public set currentDrawingTool(drawingTool: string) {
    if (this.cx != undefined) {
      this.cx.globalCompositeOperation = 'source-over';
      switch (drawingTool) {
        case 'white': {
          this.cx.strokeStyle = '#FFFFFF';
          break;
        }
        case 'black': {
          this.cx.strokeStyle = '#000000';
          break;
        }
        case 'red': {
          this.cx.strokeStyle = '#f34336';
          break;
        }
        case 'orange': {
          this.cx.strokeStyle = '#ff7f00';
          break;
        }
        case 'blue': {
          this.cx.strokeStyle = '#0080ff';
          break;
        }
        case 'green': {
          this.cx.strokeStyle = '#228b22';
          break;
        }
        case 'clear': {
          this.cx.clearRect(0, 0, this.width, this.height);
          break;
        }
        case 'erase': {
          this.cx.globalCompositeOperation = 'destination-out';
          break;
        }
        default: {
          this.cx.strokeStyle = '#FFFFFF';
          break;
        }
      }
    }
  }

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    if (typeof this.canvas !== 'undefined') {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');

      canvasEl.width = this.width;
      canvasEl.height = this.height;

      this.cx.lineWidth = 6;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = '#FFF';

      this.InitializeCanvasWithJSON();
    }
    this.previousSelectedScene = this.selectedScene;
    this.previousSelectedImage = this.selectedImage;
  }

  public saveCanvas() {
    (async () => {
      const canvasContents = this.canvas.nativeElement.toDataURL(); // a data URL of the current canvas image
      if (canvasContents != 'data:,') {
        const data = {image: canvasContents, date: Date.now()};
        const string = JSON.stringify(data);
        await this.delay(5);
        this.scenesService.canvasSave(this.previousSelectedScene, this.previousSelectedImage, string);
        this.updateCanvas.emit('');
      }
    })();
  }

  stopDraw() {
    this.drawStarted = false;
    this.prevPos = {x: null, y: null};
    this.currentPos = {x: null, y: null};
    this.saveCanvas()
  }

  draw(mouseEvent: MouseEvent) {
    if (this.drawStarted) {
      if (this.currentPos.x == null && this.currentPos.y == null) {
        this.currentPos = {
          x: mouseEvent.offsetX,
          y: mouseEvent.offsetY
        };
      }

      //console.log(mouseEvent.offsetX + " ; " + mouseEvent.offsetY);

      this.prevPos = {
        x: this.currentPos.x,
        y: this.currentPos.y
      };

      this.currentPos = {
        x: mouseEvent.offsetX,
        y: mouseEvent.offsetY
      };

      // This method does the actual drawing
      if (this.modeService.selectedMode === 'draw') {
        this.drawOnCanvas(this.prevPos, this.currentPos);
      }
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) {
      return;
    }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y); // from
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  print(s: string) {
    console.log(s);
  }
}
