import { Component, OnInit, Input, Output, EventEmitter, NgModule, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Scene,SceneImage } from '../types';
import { ScenesService } from '../scenes.service';
import { AddSceneDialogComponent } from '../add-scene-dialog/add-scene-dialog.component';
import { AddImageDialogComponent } from '../add-image-dialog/add-image-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css']
})
export class SceneDisplayComponent implements OnInit {

  @Input() public set imageName(imageName: string) {
      if (imageName != null) {
        this.SCENES[this.selectedScene].images[this.selectedImage].name = imageName;
      }
    }
  @Input() displayBar: boolean;
  @Input() currentDrawingTool: string;
  @Output() imageChange = new EventEmitter<string>();
  @Input() selectedMode : string;

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth : number;
  imageHeigth : number;
  addSceneDialogRef: MatDialogRef<AddSceneDialogComponent>;
  addImageDialogRef: MatDialogRef<AddImageDialogComponent>;

  addButtonPath = 'images/add.png';
  SCENES: Array<Scene> = [];

  changeScene(sceneNumber: number) {
    this.selectedImage = 0;
    this.selectedScene = sceneNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes(this.SCENES);
    this.UpdateDimensions();
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes(this.SCENES);
    this.UpdateDimensions();
  }

  @ViewChild("bigImageContainer") bigImageContainer: ElementRef;

  UpdateDimensions() {
    this.getScenes();
    let img = new Image();
    img.src = this.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    img.onload = function (event) {
      let loadedImage = event.currentTarget as HTMLImageElement;
      let width = loadedImage.width;
      let height = loadedImage.height;
    }
    this.imageWidth = img.width;
    this.imageHeigth = img.height;




    //variable to call an update on the canvas
    this.currImage++;

    let bigImageContainer: HTMLDivElement = this.bigImageContainer.nativeElement;
    // Resizes the image if its bigger than the div holding it
    if (this.imageWidth > bigImageContainer.clientWidth) {
      let relation = bigImageContainer.clientWidth/this.imageWidth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
    if (this.imageHeigth > bigImageContainer.clientHeight) {
      let relation = bigImageContainer.clientHeight/this.imageHeigth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
  }

  canvasSave(canvasData: string) {
    this.SCENES[this.selectedScene].images[this.selectedImage].canvasData = canvasData;
  }

  getScenes(): void {
    this.SCENES = this.scenesService.getScenes();
  }

  constructor(private scenesService: ScenesService,
              private dialog: MatDialog) { }

  openAddSceneDialog() {
    this.addSceneDialogRef = this.dialog.open(AddSceneDialogComponent, {
      hasBackdrop: true
    });
    this.addSceneDialogRef.afterClosed().subscribe(result => {
      this.getScenes();
    });
  }

  openAddImageDialog() {
    this.addImageDialogRef = this.dialog.open(AddImageDialogComponent, {
      hasBackdrop: true
    });
    let instance = this.addImageDialogRef.componentInstance;
    instance.sceneNumber = this.selectedScene;
    this.addImageDialogRef.afterClosed().subscribe(result => {
      this.getScenes();
    });
  }

  ngOnInit(): void {

    (async () => {
      this.getScenes();
       await this.delay(400);
       if (this.SCENES.length != 0) {
         this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
         this.UpdateDimensions();
       }
   })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
