import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {pairwise, switchMap, takeUntil} from 'rxjs/operators';
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
          this.cx.strokeStyle = '#000000';
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

      this.captureEvents(canvasEl);
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
            );
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
        if (this.modeService.selectedMode === 'draw') {
          this.drawOnCanvas(prevPos, currentPos);
        }
      });
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
}
