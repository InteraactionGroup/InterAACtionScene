import { Component, OnInit, Input, Output, EventEmitter, NgModule, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Scene,SceneImage } from '../types';
import { ScenesService } from '../scenes.service';
import { SettingsService } from '../settings.service';
import { AddSceneDialogComponent } from '../add-scene-dialog/add-scene-dialog.component';
import { AddImageDialogComponent } from '../add-image-dialog/add-image-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotspotCreateComponent } from '../hotspot-create/hotspot-create.component';

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css'],
  providers: [ { provide : MatDialogRef, useValue: {}}],
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
  @Input() imageSelected : boolean = true;

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth : number;
  imageHeigth : number;
  addSceneDialogRef: MatDialogRef<AddSceneDialogComponent>;
  addImageDialogRef: MatDialogRef<AddImageDialogComponent>;

  addButtonPath = 'images/add.png';
  SCENES: Array<Scene> = [];
  SETTINGS : Array<Boolean> = [];

  changeScene(sceneNumber: number) {
    this.selectedScene = sceneNumber;
    this.selectNonHiddenImage();
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes(this.SCENES);
    this.UpdateDimensions();
    this.imageSelected = false;
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.scenesService.updateScenes(this.SCENES);
    this.UpdateDimensions();
    this.imageSelected = true;
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


  hasAtLeastOneScene(){
    if(this.SCENES !== null) {
      return this.SCENES.length != 0;
    }
    return false;
  }

  selectNonHiddenScene() {
      let i: number = 0;
      while (i < this.SCENES.length && this.SCENES[i].hidden == true) {
        i++;
      }
      if (i != this.SCENES.length) {
        this.selectedScene = i;
      } else {
        this.selectedScene = 0;
      }
      this.selectNonHiddenImage();
      this.UpdateDimensions();
  }

  selectNonHiddenImage() {
    let i: number = 0;
    while (i < this.SCENES[this.selectedScene].images.length && this.SCENES[this.selectedScene].images[i].hidden == true) {
      i++;
    }
    if (i != this.SCENES[this.selectedScene].images.length) {
      this.selectedImage = i;
    } else {
      this.selectedImage = 0;
    }
  }

  onScenesChange(functionUsed: string): void {
    this.SCENES = this.scenesService.getScenes();
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
        this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
        break;
    }

  }

  onHotspotsChange() {
    this.SCENES = this.scenesService.getScenes();
    this.currImage++;
  }
  onCanvasChange() {
    this.SCENES = this.scenesService.getScenes();
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
         this.selectNonHiddenScene();
         this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
         this.UpdateDimensions();
       }
    })();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
