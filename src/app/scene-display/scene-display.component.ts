import { Component, OnInit } from '@angular/core';
import { Image } from '../types';

@Component({
  selector: 'app-scene-display',
  templateUrl: './scene-display.component.html',
  styleUrls: ['./scene-display.component.css']
})
export class SceneDisplayComponent implements OnInit {

  selectedScene = 0;
  selectedImage = 0;

  SCENES: Array<Array<Image>> = [
    [
      { name: "scene1"  , path: 'images/imageTest1.jpg' },
      { name: "scene2"  , path: 'images/imageTest2.jpg' },
      { name: "scene3"  , path: 'images/imageTest3.jpg' },
      { name: "scene4"  , path: 'images/imageTest3.jpg' },
      { name: "scene5"  , path: 'images/imageTest2.jpg' },
      { name: "scene6"  , path: 'images/imageTest1.jpg' }
    ],
    [
      { name: "scene12"  , path: 'images/imageTest1.jpg' },
      { name: "scene22"  , path: 'images/imageTest2.jpg' },
      { name: "scene32"  , path: 'images/imageTest2.jpg' },
      { name: "scene42"  , path: 'images/imageTest1.jpg' },
      { name: "scene52"  , path: 'images/imageTest3.jpg' },
      { name: "scene62"  , path: 'images/imageTest3.jpg' }
    ]
  ];

  changeScene(sceneNumber: number) {
    this.selectedImage = 0;
    this.selectedScene = sceneNumber;
  }

  changeImage(imageNumber: number) {
    this.selectedImage = imageNumber;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
