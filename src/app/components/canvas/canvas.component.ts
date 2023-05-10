import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from '../../services/mode.service';
import {SceneDisplayService} from "../../services/scene-display.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor(
    private scenesService: ScenesService,
    public modeService: ModeService,
    public sceneDisplayService: SceneDisplayService
  ) {
    console.log("This size " + this.sceneDisplayService.imageWidth + " ; " + this.sceneDisplayService.imageHeigth );
  }

  ngOnInit(): void {
    this.InitializeCanvasWithJSON();
    console.log("This size " + this.sceneDisplayService.imageWidth + " ; " + this.sceneDisplayService.imageHeigth );
  }

  prevPos = {x: null, y: null};
  currentPos = {x: null, y: null};
  drawStarted = false;

  @ViewChild('canvas') public canvas: ElementRef;

  previousSelectedScene = 0;
  previousSelectedImage = 0;
  @Output() updateCanvas = new EventEmitter<string>();

  @Input() public canvasD: string;

  private cx: CanvasRenderingContext2D;

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
        this.cx.clearRect(0, 0, this.sceneDisplayService.imageWidth, this.sceneDisplayService.imageHeigth);
        this.cx.drawImage(image, 0, 0); // draw the new image to the screen
      };
    }
  }

  @Input() public set sizeDrawingTool(size: number) {
    if (this.cx !== undefined) {
      this.cx.lineWidth = size;
    }
  }

  @Input()
  public set currentDrawingTool(drawingTool: string) {
    if (this.cx !== undefined) {
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
        case 'brown': {
          this.cx.strokeStyle = '#8b4513';
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
        case 'yellow': {
          this.cx.strokeStyle = '#ffcc00';
          break;
        }
        case 'blue': {
          this.cx.strokeStyle = '#0080ff';
          break;
        }
        case 'purple': {
          this.cx.strokeStyle = '#a300cc';
          break;
        }
        case 'pink': {
          this.cx.strokeStyle = '#ff00ff';
          break;
        }
        case 'green': {
          this.cx.strokeStyle = '#228b22';
          break;
        }
        case 'clear': {
          this.cx.clearRect(0, 0, this.sceneDisplayService.imageWidth, this.sceneDisplayService.imageHeigth);
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

  public ngAfterViewInit() {
    if (typeof this.canvas !== 'undefined') {
      const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
      this.cx = canvasEl.getContext('2d');

       canvasEl.width = this.sceneDisplayService.imageWidth;
       canvasEl.height = this.sceneDisplayService.imageHeigth;

      this.cx.lineWidth = this.modeService.sizeDrawingTool;
      this.cx.lineCap = 'round';
      this.cx.strokeStyle = '#FFF';

      this.InitializeCanvasWithJSON();
    }
    this.previousSelectedScene = this.sceneDisplayService.selectedScene;
    this.previousSelectedImage = this.sceneDisplayService.selectedImage;
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
    this.saveCanvas();
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
