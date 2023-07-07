import { Component, OnInit } from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {SceneDisplayService} from '../../services/scene-display.service';

@Component({
  selector: 'app-hotspot-delete-all-component',
  templateUrl: './hotspot-delete-all.component.html',
  styleUrls: ['./hotspot-delete-all.component.css']
})
export class HotspotDeleteAllComponent implements OnInit {

  constructor(public sceneService: ScenesService, public sceneDisplayService: SceneDisplayService) { }

  ngOnInit(): void {
  }

  /**
   * Removes all hotspots from the selected image
   */
  removeAllHotspots(): void {
    let selectedScene = this.sceneDisplayService.selectedScene;
    let selectedImage = this.sceneDisplayService.selectedImage;
    this.sceneService.removeAllHotspots(selectedScene, selectedImage);
  }

}
