import { Component, OnInit } from '@angular/core';
import { ScenesService} from '../../services/scenes.service';

@Component({
  selector: 'app-dialog-reset-scenes',
  templateUrl: './dialog-reset-scenes.component.html',
  styleUrls: ['./dialog-reset-scenes.component.css']
})
export class DialogResetScenesComponent implements OnInit {

  constructor(public sceneService: ScenesService) { }

  ngOnInit(): void {
  }

  resetScenes(): void {
    this.sceneService.removeAll();
  }
}
