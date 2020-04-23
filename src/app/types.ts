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
 }

 /**
  * an image in a scene
  */
 export class SceneImage {
   name: string;
   base64data: string;
   canvasData: string;

   constructor(name, base64data, canvasData = null) {
    this.name = name;
    this.base64data = base64data;
    this.canvasData = canvasData;
  }
 }
