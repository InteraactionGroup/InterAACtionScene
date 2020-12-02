import {Injectable} from '@angular/core';
import {Hotspot, Scene} from '../types';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  SCENES: Array<Scene> = [];
  openRequest;

  constructor() {
    this.init();
  }

  addScene(base64data: string, sceneName: string = '', firstimagename: string = '') {
    if (this.SCENES == null || this.SCENES.length == 0) {
      this.SCENES = [{
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      }];
    } else {
      this.SCENES.push({
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      });
    }
    this.update();
  }

  addImage(base64data: string, sceneNumber: number, imageName: string = '') {
    this.SCENES[sceneNumber].images.push({
      name: imageName,
      base64data,
      canvasData: null,
      hidden: false,
      hotspots: Array<Hotspot>()
    });
    this.update();
  }

  canvasSave(selectedScene: number, selectedImage: number, canvasData: string) {
    this.SCENES[selectedScene].images[selectedImage].canvasData = canvasData;
    this.update();
  }

  getScenes(): Array<Scene> {
    return this.SCENES;
  }

  updateScenes() {
    this.update();
  }

  renameImage(selectedScene: number, selectedImage: number, newImageName: string) {
    this.SCENES[selectedScene].images[selectedImage].name = newImageName;
    this.update();
  }

  renameScene(selectedScene: number, newImageName: string) {
    this.SCENES[selectedScene].name = newImageName;
    this.update();
  }

  removeImage(selectedScene: number, selectedImage: number) {
    if (this.SCENES[selectedScene].images.length >= 2) {
      this.SCENES[selectedScene].images.splice(selectedImage, 1);
      this.update();
    } else {
      this.removeScene(selectedScene);
    }

  }

  removeScene(selectedScene: number) {
    this.SCENES.splice(selectedScene, 1);
    this.update();
  }

  hideImage(selectedScene: number, selectedImage: number) {
    const sceneIsHidden = this.SCENES[selectedScene].images[selectedImage].hidden;
    this.SCENES[selectedScene].images[selectedImage].hidden = !sceneIsHidden;
    // Hides the scene if all it's images are hidden
    let i = 0;
    while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
      i++;
    }
    if (i == this.SCENES[selectedScene].images.length) {
      if (!this.SCENES[selectedScene].hidden) {
        this.hideScene(selectedScene);
      }
    }
    this.update();
  }

  hideScene(selectedScene: number) {
    const sceneIsHidden = this.SCENES[selectedScene].hidden;
    if (sceneIsHidden) {
      this.SCENES[selectedScene].hidden = false;
      // Test if all of the images in the scene are hidden, unhides the first if so.
      let i = 0;
      while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
        i++;
      }
      if (i == this.SCENES[selectedScene].images.length) {
        this.hideImage(selectedScene, 0);
      }
    } else {
      this.SCENES[selectedScene].hidden = true;
    }
    this.update();
  }


  addHotspot(selectedScene: number, selectedImage: number, hotspotName: string, svgPath: number[], strokeColor: string, base64sound: string) {
    if (this.SCENES[selectedScene].images[selectedImage].hotspots == null) {
      this.SCENES[selectedScene].images[selectedImage].hotspots = [{
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound
      }];
    } else {
      this.SCENES[selectedScene].images[selectedImage].hotspots.push({
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound
      });
    }
    this.update();
  }

  getImageHotspots(selectedScene: number, selectedImage: number): Array<Hotspot> {

    if (selectedScene != undefined && selectedImage != undefined) {
      return this.SCENES[selectedScene].images[selectedImage].hotspots;
    }
    return [];
  }

  // INITIALISATION
  init() {

    this.openRequest = indexedDB.open('Saves', 1);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      const gridStore = db.transaction(['Scenes']).objectStore('Scenes').get(1);
      gridStore.onsuccess = e => {
        this.SCENES = gridStore.result;
      };

    };

    this.openRequest.onupgradeneeded = event => {

      // Creaction of Store
      const db = event.target.result;
      const transaction = event.target.transaction;

      db.createObjectStore('Scenes', {autoIncrement: true});
      const paletteStore = transaction.objectStore('Scenes');
      paletteStore.add(this.SCENES);

    };
  }

  update() {

    this.openRequest = indexedDB.open('Saves', 1);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THE GRID
      const gridStore = db.transaction(['Scenes'], 'readwrite');
      const gridObjectStore = gridStore.objectStore('Scenes');
      const storeGridRequest = gridObjectStore.get(1);
      storeGridRequest.onsuccess = () => {
        gridObjectStore.put(this.SCENES, 1);
      };

    };
  }

}
