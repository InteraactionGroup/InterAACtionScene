import { Injectable } from '@angular/core';
import {SettingsService} from './services/settings.service';
import {LanguageService} from './services/language.service';

@Injectable({
  providedIn: 'root',
})

/**
 * a color
 */
 export class Color {
   name: string;
   hex: string;
 }

 /**
  * a scene
  */
 export class Scene {
   name: string;
   images: SceneImage[];
   hidden: boolean;
 }

 /**
  * an image in a scene
  */
 export class SceneImage {
   name: string;
   base64data: string;
   canvasData: string;
   hidden: boolean;
   hotspots: Hotspot[];

   constructor(name, base64data, canvasData = null, hidden = false, hotspots = Array<Hotspot>()) {
    this.name = name;
    this.base64data = base64data;
    this.canvasData = canvasData;
    this.hidden = hidden;
    this.hotspots = hotspots;
  }
 }

 export abstract class Hotspot {
   name: string;
   svgPointArray: number[]; // Each point is in percentage
   strokeColor: string;
   type: string;
   strokeWidth: number;

    constructor(name, svgPointArray, strokeColor, type, strokeWidth) {
      this.name = name;
      this.svgPointArray = svgPointArray;
      this.strokeColor = strokeColor;
      this.type = type;
      this.strokeWidth = strokeWidth;
    }

    getType() {
      return this.type;
    }

    abstract getData();

 }

 export class SoundHotspot extends Hotspot {
   base64sound: string;

    constructor(name, svgPointArray, strokeColor, type, strokeWidth, base64sound) {
      super(name, svgPointArray, strokeColor, type, strokeWidth);
      this.base64sound = base64sound;
    }

    getData() {
      return this.base64sound;
    }
 }

 export class ImageHotspot extends Hotspot {
   numImage: number;

    constructor(name, svgPointArray, strokeColor, type, strokeWidth, numImage) {
      super(name, svgPointArray, strokeColor, type, strokeWidth);
      this.numImage = numImage;
    }

    getData() {
      return this.numImage;
    }
 }

export class Configuration {
   'VOLUME': number;
  'DWELL_TIME_ENABLED': boolean;
  'DWELL_TIME_TIMEOUT_VALUE': number;
  'SPEECH_SPEAKER_ENABLE': boolean;
  'LANGUAGE_CHOICE': string;
}
