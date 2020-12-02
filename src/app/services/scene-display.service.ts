import {ElementRef, Injectable, ViewChild} from '@angular/core';
import {ScenesService} from "./scenes.service";

@Injectable({
  providedIn: 'root'
})
export class SceneDisplayService {

  constructor(public scenesService: ScenesService) { }

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth : number;
  imageHeigth : number;

  UpdateDimensions() {
    this.onCanvasChange();
    let img = new Image();
    img.src = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    this.imageWidth = img.width;
    this.imageHeigth = img.height;

    //variable to call an update on the canvas
    this.currImage++;

    let bigImageContainer: HTMLElement = document.getElementById('bigImageContainer');
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

  onCanvasChange() {
    this.scenesService.SCENES = this.scenesService.getScenes();
  }

}
