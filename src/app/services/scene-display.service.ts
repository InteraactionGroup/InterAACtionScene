import {Injectable} from '@angular/core';
import {ScenesService} from "./scenes.service";
import {Subject} from "rxjs";
import {SettingsService} from './settings.service';
import { ModeService } from './mode.service';

@Injectable({
  providedIn: 'root'
})
export class SceneDisplayService {

  public bigImageContainerObservable = new Subject<string>();
  public hideShowPanelButtonObservable = new Subject<string>();

  constructor(public scenesService: ScenesService,
              public settingsService: SettingsService,
              public modeService: ModeService) {
  }

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth: number;
  imageHeigth: number;
  hidePanel = false; // Variable used to hide or show the left panel

  UpdateDimensions() {
    this.onCanvasChange();
    let img = new Image();
    img.src = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].base64data;
    this.imageWidth = img.width;
    this.imageHeigth = img.height;

    //variable to call an update on the canvas
    this.currImage++;

    let bigImageContainer: HTMLElement;

    if(this.settingsService.AFSR){
      bigImageContainer = document.getElementById('bigImageContainerAFSR');
    }else if (this.modeService.selectedMode === 'manage-scenes') {
      bigImageContainer = document.getElementById('bigImageContainerManage');
    } else {
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
