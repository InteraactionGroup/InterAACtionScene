import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Scene} from '../../types';
import { ScenesService } from '../../services/scenes.service';
import { AddSceneDialogComponent } from '../add-scene-dialog/add-scene-dialog.component';
import { AddImageDialogComponent } from '../add-image-dialog/add-image-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {ModeService} from "../../services/mode.service";

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css'],
  providers: [ { provide : MatDialogRef, useValue: {}}],
})
export class SceneDisplayComponent implements OnInit {

  @Input() public set imageName(imageName: string) {
      if (imageName != null && this.scenesService.SCENES[this.selectedScene]!==null) {
        this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name = imageName;
      }
    }
  @Input() currentDrawingTool: string;
  @Output() imageChange = new EventEmitter<string>();
  @Input() imageSelected : boolean = true;

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth : number;
  imageHeigth : number;
  addSceneDialogRef: MatDialogRef<AddSceneDialogComponent>;
  addImageDialogRef: MatDialogRef<AddImageDialogComponent>;

  addButtonPath = 'images/add.png';
  SETTINGS : Array<Boolean> = [];

  changeScene(sceneNumber: number) {
    this.selectedScene = sceneNumber;
    this.selectNonHiddenImage();
    this.imageChange.emit(this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes();
    this.UpdateDimensions();
    this.imageSelected = false;
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
    this.imageChange.emit(this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes();
    this.UpdateDimensions();
    this.imageSelected = true;
  }

  @ViewChild("bigImageContainer") bigImageContainer: ElementRef;

  UpdateDimensions() {
    this.onCanvasChange();
    let img = new Image();
    img.src = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    this.imageWidth = img.width;
    this.imageHeigth = img.height;

    //variable to call an update on the canvas
    this.currImage++;

    let bigImageContainer: HTMLDivElement = this.bigImageContainer.nativeElement;
    // Resizes the image if its bigger than the div holding it
    if (this.imageWidth > bigImageContainer.clientWidth) {
      let relation = (bigImageContainer.clientWidth-20)/this.imageWidth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
    if (this.imageHeigth > bigImageContainer.clientHeight) {
      let relation = (bigImageContainer.clientHeight-20)/this.imageHeigth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
  }


  hasAtLeastOneScene(){
    if(this.scenesService.SCENES !== null) {
      return this.scenesService.SCENES.length != 0;
    }
    return false;
  }

  selectNonHiddenScene() {
      let i: number = 0;
      while (i < this.scenesService.SCENES.length && this.scenesService.SCENES[i].hidden == true) {
        i++;
      }
      if (i != this.scenesService.SCENES.length) {
        this.selectedScene = i;
      } else {
        this.selectedScene = 0;
      }
      this.selectNonHiddenImage();
      this.UpdateDimensions();
  }

  selectNonHiddenImage() {
    let i: number = 0;
    while (i < this.scenesService.SCENES[this.selectedScene].images.length && this.scenesService.SCENES[this.selectedScene].images[i].hidden == true) {
      i++;
    }
    if (i != this.scenesService.SCENES[this.selectedScene].images.length) {
      this.selectedImage = i;
    } else {
      this.selectedImage = 0;
    }
  }

  onScenesChange(functionUsed: string): void {
    this.scenesService.SCENES = this.scenesService.getScenes();
    switch(functionUsed) {
      case "hide":
        break;
      case "remove":
        if (this.imageSelected === true) {
          this.selectedImage = 0;
        } else {
          this.selectedScene = 0;
          this.selectedImage = 0;
        }
        break;
      case "rename":
        this.imageChange.emit(this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name);
        break;
    }

  }

  onHotspotsChange() {
    this.scenesService.SCENES = this.scenesService.getScenes();
    this.currImage++;
  }
  onCanvasChange() {
    this.scenesService.SCENES = this.scenesService.getScenes();
  }

  constructor(public scenesService: ScenesService,
              private dialog: MatDialog, public modeService: ModeService) { }

  openAddSceneDialog() {
    this.addSceneDialogRef = this.dialog.open(AddSceneDialogComponent, {
      hasBackdrop: true
    });
    this.addSceneDialogRef.afterClosed().subscribe(result => {
      this.onCanvasChange();
    });
  }

  openAddImageDialog() {
    this.addImageDialogRef = this.dialog.open(AddImageDialogComponent, {
      hasBackdrop: true
    });
    let instance = this.addImageDialogRef.componentInstance;
    instance.sceneNumber = this.selectedScene;
    this.addImageDialogRef.afterClosed().subscribe(result => {
      this.onCanvasChange();
    });
  }

  ngOnInit(): void {
    (async () => {
      this.onCanvasChange();
       await this.delay(400);
       if (this.scenesService.SCENES != null && this.scenesService.SCENES.length != 0) {
         this.selectNonHiddenScene();
         this.imageChange.emit(this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name);
         this.UpdateDimensions();
       }
    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
