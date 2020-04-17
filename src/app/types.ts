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
   images: Image[];
 }

 /**
  * an image
  */
 export class Image {
   name: string;
   path: string;
 }
