import { Component, OnInit } from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import * as url from 'url';

@Component({
  selector: 'app-default-standard-scene',
  templateUrl: './default-standard-scene.component.html',
  styleUrls: ['./default-standard-scene.component.css']
})
export class DefaultStandardSceneComponent implements OnInit {
  private imageExample: any;

  constructor(public scenesService: ScenesService) { }

  ngOnInit(): void {
    console.log('nb delem dans le tableau scene', this.scenesService.getScenes().length);
    if (this.scenesService.SCENES.length === 0){
      this.defaultScene();
    }
  }
  defaultScene(){
    const image = url('assets/images/example.jpg');
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageExample = reader.result;
    };
    this.scenesService.addScene(this.imageExample, 'Example Scene', 'Example Image');
  }

}
