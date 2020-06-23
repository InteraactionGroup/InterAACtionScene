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

 export class Hotspot {
   name: string;
   svg: Element;
   base64sound: string;
 }
