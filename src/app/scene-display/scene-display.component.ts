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
      { name: "scene1"  , path: '#FFFFFF' },
      { name: "scene2"  , path: '#000000' },
      { name: "scene3"  , path: '#f34336' },
      { name: "scene4"  , path: '#ff7f00' },
      { name: "scene5"  , path: '#0080ff' },
      { name: "scene6"  , path: '#228b22' }
    ],
    [
      { name: "scene12"  , path: '#FFFFFF' },
      { name: "scene22"  , path: '#000000' },
      { name: "scene32"  , path: '#f34336' },
      { name: "scene42"  , path: '#ff7f00' },
      { name: "scene52"  , path: '#0080ff' },
      { name: "scene62"  , path: '#228b22' }
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
