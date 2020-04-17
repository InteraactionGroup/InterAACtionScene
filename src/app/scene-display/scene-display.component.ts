import { Component, OnInit, Input, Output, EventEmitter, NgModule } from '@angular/core';
import { Scene,Image } from '../types';

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
  @Output() imageChange = new EventEmitter<string>();

  selectedScene = 0;
  selectedImage = 0;

  addButtonPath = 'images/add.png';
  SCENES: Array<Scene> = [
    {
      name: "Scene 1",
      images:[
        { name: "Image 1"  , path: 'images/imageTest1.jpg' },
        { name: "Image 2"  , path: 'images/imageTest2.jpg' },
        { name: "Image 3"  , path: 'images/imageTest3.jpg' },
        { name: "Image 4"  , path: 'images/imageTest3.jpg' },
        { name: "Image 5"  , path: 'images/imageTest2.jpg' },
        { name: "Image 6"  , path: 'images/imageTest1.jpg' }
      ]
    },
    {
      name : "Scene 2",
      images:[
        { name: "Image 7"  , path: 'images/imageTest1.jpg' },
        { name: "Image 8"  , path: 'images/imageTest2.jpg' },
        { name: "Image 9"  , path: 'images/imageTest2.jpg' },
        { name: "Image 10"  , path: 'images/imageTest1.jpg' },
        { name: "Image 11"  , path: 'images/imageTest3.jpg' },
        { name: "Image 12"  , path: 'images/imageTest3.jpg' },
        { name: "Image 7"  , path: 'images/imageTest1.jpg' },
        { name: "Image 8"  , path: 'images/imageTest2.jpg' },
        { name: "Image 9"  , path: 'images/imageTest2.jpg' },
        { name: "Image 10"  , path: 'images/imageTest1.jpg' },
        { name: "Image 11"  , path: 'images/imageTest3.jpg' },
        { name: "Image 12"  , path: 'images/imageTest3.jpg' }
      ]
    }
  ];

  changeScene(sceneNumber: number) {
    this.selectedImage = 0;
    this.selectedScene = sceneNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
  }

  constructor() { }

  ngOnInit(): void {
    this.imageChange.emit(this.SCENES[this.selectedScene].images[this.selectedImage].name);
  }

}
