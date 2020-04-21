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
   path: string;
   canvasData: string;

   constructor(name, path, canvasData = null) {
    this.name = name;
    this.path = path;
    this.canvasData = canvasData;
  }
 }
