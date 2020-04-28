import { Injectable } from '@angular/core';
import { Scene,SceneImage } from './types';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  SCENES : Array<Scene> = [];

  constructor() {
    this.SCENES = JSON.parse(localStorage.getItem('Scenes'));
  }

  addScene(base64data : string,sceneName : string = "",firstimagename: string = "") {
    if (this.SCENES.length == 0) {
      this.SCENES = [{name: sceneName,
                    images: [
                      {name : firstimagename, base64data : base64data, canvasData : null}
                    ]}];
    } else {
      this.SCENES.push({name: sceneName,
                      images: [
                        {name : firstimagename, base64data : base64data, canvasData : null}
                      ]});
    }
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  addImage(base64data : string,sceneNumber: number,imageName : string = "") {
    this.SCENES[sceneNumber].images.push({name : imageName, base64data : base64data, canvasData : null })
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  getScenes(): Array<Scene> {
    return JSON.parse(localStorage.getItem('Scenes'));
  }

  updateScenes(scenes : Array<Scene>) {
    this.SCENES = scenes;
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

}
