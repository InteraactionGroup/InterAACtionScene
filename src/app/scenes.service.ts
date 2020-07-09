import { Injectable } from '@angular/core';
import { Scene,SceneImage,Hotspot } from './types';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  SCENES : Array<Scene> = [];

  constructor() {
    this.SCENES = JSON.parse(localStorage.getItem('Scenes'));
  }

  addScene(base64data : string,sceneName : string = "",firstimagename: string = "") {
    if (this.SCENES == null || this.SCENES.length == 0) {
      this.SCENES = [{name: sceneName,
                      images: [
                        {name : firstimagename, base64data : base64data, canvasData : null, hidden: false, hotspots: Array<Hotspot>()}
                      ],
                      hidden : false
                    }];
    } else {
      this.SCENES.push({name: sceneName,
                        images: [
                          {name : firstimagename, base64data : base64data, canvasData : null, hidden: false, hotspots: Array<Hotspot>()}
                        ],
                        hidden : false
                      });
    }
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  addImage(base64data : string,sceneNumber: number,imageName : string = "") {
    this.SCENES[sceneNumber].images.push({name : imageName, base64data : base64data, canvasData : null,hidden : false , hotspots: Array<Hotspot>()})
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  canvasSave(selectedScene: number, selectedImage: number,canvasData: string) {
    this.SCENES[selectedScene].images[selectedImage].canvasData = canvasData;
    console.log(selectedScene);
    console.log(selectedImage);


    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  getScenes(): Array<Scene> {
    return JSON.parse(localStorage.getItem('Scenes'));
  }

  setScenesFromJSON(scenes : Array<Scene>) {
    this.SCENES = scenes;
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  updateScenes(scenes : Array<Scene>) {
    this.SCENES = scenes;
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  renameImage(selectedScene: number, selectedImage: number, newImageName: string) {
    this.SCENES[selectedScene].images[selectedImage].name = newImageName;
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  renameScene(selectedScene: number, newImageName: string) {
    this.SCENES[selectedScene].name = newImageName;
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  removeImage(selectedScene: number, selectedImage: number) {
    if (this.SCENES[selectedScene].images.length >= 2) {
      this.SCENES[selectedScene].images.splice(selectedImage, 1);
      localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
    } else {
      this.removeScene(selectedScene);
    }

  }

  removeScene(selectedScene: number) {
    this.SCENES.splice(selectedScene, 1);
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  hideImage(selectedScene: number, selectedImage: number) {
    let sceneIsHidden = this.SCENES[selectedScene].images[selectedImage].hidden;
    if (sceneIsHidden) {
      this.SCENES[selectedScene].images[selectedImage].hidden = false;
    } else {
      this.SCENES[selectedScene].images[selectedImage].hidden = true;
    }
    // Hides the scene if all it's images are hidden
    let i: number = 0;
    while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden == true) {
      i++;
    }
    if (i == this.SCENES[selectedScene].images.length) {
      if (this.SCENES[selectedScene].hidden === false) {
        this.hideScene(selectedScene);
      }
    }
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  hideScene(selectedScene: number) {
    let sceneIsHidden = this.SCENES[selectedScene].hidden;
    if (sceneIsHidden) {
      this.SCENES[selectedScene].hidden = false;
      // Test if all of the images in the scene are hidden, unhides the first if so.
      let i: number = 0;
      while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden == true) {
        i++;
      }
      if (i == this.SCENES[selectedScene].images.length) {
        this.hideImage(selectedScene,0);
      }
    } else {
      this.SCENES[selectedScene].hidden = true;
    }
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }


  addHotspot(selectedScene:number, selectedImage: number,hotspotName:string, svgPath: number[],strokeColor: string,base64sound: string) {
    if (this.SCENES[selectedScene].images[selectedImage].hotspots == null) {
      this.SCENES[selectedScene].images[selectedImage].hotspots = [{name:hotspotName, svgPointArray: svgPath,strokeColor: strokeColor,base64sound: base64sound}];
    } else {
      this.SCENES[selectedScene].images[selectedImage].hotspots.push({name:hotspotName, svgPointArray: svgPath,strokeColor: strokeColor,base64sound: base64sound});
    }
    localStorage.setItem('Scenes',JSON.stringify(this.SCENES));
  }

  getImageHotspots(selectedScene:number, selectedImage: number): Array<Hotspot> {
    return this.SCENES[selectedScene].images[selectedImage].hotspots;
  }


}
