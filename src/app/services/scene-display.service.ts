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
    let img = new Image();
    img.src = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    this.imageWidth = img.width * this.zoom;
    this.imageHeigth = img.height * this.zoom;

    //variable to call an update on the canvas
    this.currImage++;

    let bigImageContainer: HTMLElement;

    if(this.settingsService.AFSR){
      bigImageContainer = document.getElementById('bigImageContainerAFSR');
    }else{
      bigImageContainer = document.getElementById('bigImageContainer');
    }

    // Resizes the image if its bigger than the div holding it
    if (this.imageWidth > bigImageContainer.clientWidth) {
      let relation = (bigImageContainer.clientWidth - 20) / this.imageWidth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
    if (this.imageHeigth > bigImageContainer.clientHeight) {
      let relation = (bigImageContainer.clientHeight - 20) / this.imageHeigth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
  }

  zoomInOrOut(zoom: string) {
    let bigImageContainer: HTMLElement;
    if(this.settingsService.AFSR){
      bigImageContainer = document.getElementById('bigImageContainerAFSR');
    }else{
      bigImageContainer = document.getElementById('bigImageContainer');
    }

    if (zoom === "in" && this.imageWidth < bigImageContainer.clientWidth - 20 && this.imageHeigth < bigImageContainer.clientHeight - 20) {
      this.zoom += 0.4;
    } else if (zoom === "out" && this.imageWidth > 100 && this.imageHeigth > 100) {
      this.zoom -= 0.4;
    }
    console.log(this.zoom);
    this.UpdateDimensions();
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
