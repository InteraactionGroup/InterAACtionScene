import {Injectable} from '@angular/core';
import {ScenesService} from "./scenes.service";
import {Subject} from "rxjs";
import {SettingsService} from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SceneDisplayService {

  public bigImageContainerObservable = new Subject<string>();
  public hideShowPanelButtonObservable = new Subject<string>();

  constructor(public scenesService: ScenesService,
              public settingsService: SettingsService) {
  }

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth: number;
  imageHeigth: number;
  zoom = 1;
  hidePanel = false; // Variable used to hide or show the left panel

  UpdateDimensions() {
    this.onCanvasChange();
    let bigImageContainer: HTMLElement;

    if(this.settingsService.AFSR){
      bigImageContainer = document.getElementById('bigImageContainerAFSR');
    }else{
      bigImageContainer = document.getElementById('bigImageContainer');
    }

    let maxWidth = bigImageContainer.clientWidth;
    let maxHeight = bigImageContainer.clientHeight;

    let img = new Image();
    img.src = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    this.imageWidth = img.width * this.zoom;
    this.imageHeigth = img.height * this.zoom;

    if (this.imageWidth > maxWidth) {
      let relation = (maxWidth - 20) / this.imageWidth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
      img.width = maxWidth;
      img.height = maxHeight;
    }
    if (this.imageHeigth > maxHeight) {
      let relation = (maxHeight - 20) / this.imageHeigth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
      img.width = maxWidth;
      img.height = maxHeight;
    }


    //variable to call an update on the canvas
    this.currImage++;
  }

  zoomInOrOut(zoom: string) {
    let bigImageContainer: HTMLElement;
    if(this.settingsService.AFSR){
      bigImageContainer = document.getElementById('bigImageContainerAFSR');
    }else{
      bigImageContainer = document.getElementById('bigImageContainer');
    }

    if (zoom === "in" && this.imageWidth < bigImageContainer.clientWidth - 20 && this.imageHeigth < bigImageContainer.clientHeight - 20) {
      this.zoom += 0.5;
      this.UpdateDimensions();
    } else if (zoom === "out" && this.zoom > 0.5 && this.imageWidth > 100 && this.imageHeigth > 100) {
      this.zoom -= 0.5;
      this.UpdateDimensions();
    }
  }

  onCanvasChange() {
    this.scenesService.SCENES = this.scenesService.getScenes();
  }

  emitBigImageContainer(val){
    this.bigImageContainerObservable.next(val);
  }

  emitHideShowPanelButton(val){
    this.hideShowPanelButtonObservable.next(val);
  }
}
