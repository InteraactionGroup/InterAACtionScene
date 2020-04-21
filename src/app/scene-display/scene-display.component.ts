import { Component, OnInit, Input, Output, EventEmitter, NgModule, ElementRef, ViewChild } from '@angular/core';
import { Scene,SceneImage } from '../types';

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css']
})
export class SceneDisplayComponent implements OnInit {

  @Input() public set imageName(imageName: string) {
      if (imageName != null) {
        this.SCENES[this.selectedScene].images[this.selectedImage].name = imageName;
      }
    }
  @Input() displayBar: boolean;
  @Input() currentDrawingTool: string;
  @Output() imageChange = new EventEmitter<string>();

  selectedScene = 0;
  selectedImage = 0;
  currImage = 0; // Variable used to reinitialize the canvas everytime the image is changed
  imageWidth : number;
  imageHeigth : number;

  addButtonPath = 'images/add.png';
  SCENES: Array<Scene> = [
    {
      name: "Scene 1",
      images:[
        { name: "Image 1"  , path: 'images/imageTest1.jpg', canvasData: null },
        { name: "Image 2"  , path: 'images/imageTest2.jpg', canvasData: null },
        { name: "Image 3"  , path: 'images/imageTest3.jpg', canvasData: null },
        { name: "Image 4"  , path: 'images/imageTest3.jpg', canvasData: null },
        { name: "Image 5"  , path: 'images/imageTest2.jpg', canvasData: null },
        { name: "Image 6"  , path: 'images/imageTest1.jpg', canvasData: null }
      ]
    },
    {
      name : "Scene 2",
      images:[
        { name: "Image 7"   , path: 'images/imageTest1.jpg' , canvasData: null },
        { name: "Image 8"   , path: 'images/imageTest2.jpg' , canvasData: null },
        { name: "Image 9"   , path: 'images/imageTest2.jpg' , canvasData: null },
        { name: "Image 10"  , path: 'images/imageTest1.jpg' , canvasData: null },
        { name: "Image 11"  , path: 'images/imageTest3.jpg' , canvasData: null },
        { name: "Image 12"  , path: 'images/imageTest3.jpg' , canvasData: null },
        { name: "Image 7"   , path: 'images/imageTest1.jpg' , canvasData: null },
        { name: "Image 8"   , path: 'images/imageTest2.jpg' , canvasData: null },
        { name: "Image 9"   , path: 'images/imageTest2.jpg' , canvasData: null },
        { name: "Image 10"  , path: 'images/imageTest1.jpg' , canvasData: null },
        { name: "Image 11"  , path: 'images/imageTest3.jpg' , canvasData: null },
        { name: "Image 12"  , path: 'images/imageTest3.jpg' , canvasData: null }
      ]
    }
  ];

  changeScene(sceneNumber: number) {
    this.selectedImage = 0;
    this.selectedScene = sceneNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.UpdateDimensions();
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.UpdateDimensions();
  }

  @ViewChild("bigImageContainer") bigImageContainer: ElementRef;

  UpdateDimensions() {
    let img = new Image();
    img.src = "../../assets/" + this.SCENES[this.selectedScene].images[this.selectedImage].path;
    img.onload = function (event) {
      let loadedImage = event.currentTarget as HTMLImageElement;
      let width = loadedImage.width;
      let height = loadedImage.height;
    }
    this.imageWidth = img.width;
    this.imageHeigth = img.height;
    console.log(img.width);
    console.log(img.height);

    //test

    this.currImage++;

    let bigImageContainer: HTMLDivElement = this.bigImageContainer.nativeElement;
    // Resizes the image if its bigger than the div holding it
    if (this.imageWidth > bigImageContainer.clientWidth) {
      let relation = bigImageContainer.clientWidth/this.imageWidth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
    if (this.imageHeigth > bigImageContainer.clientHeight) {
      let relation = bigImageContainer.clientHeight/this.imageHeigth;
      this.imageWidth *= relation;
      this.imageHeigth *= relation;
    }
    console.log(bigImageContainer.clientWidth);
    console.log(bigImageContainer.clientHeight);

    console.log(this.SCENES[this.selectedScene].images[this.selectedImage].canvasData);
    console.log("test");


  }

  canvasSave(canvasData: string) {
    this.SCENES[this.selectedScene].images[this.selectedImage].canvasData = canvasData;
  }

  constructor() { }

  ngOnInit(): void {
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
    this.UpdateDimensions();
  }

}
