import { Component, OnInit } from '@angular/core';
import {SettingsService} from "../../services/settings.service";
import {ScenesService} from "../../services/scenes.service";

@Component({
  selector: 'app-dialog-reset-settings',
  templateUrl: './dialog-reset-settings.component.html',
  styleUrls: ['./dialog-reset-settings.component.css']
})
export class DialogResetSettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public sceneService: ScenesService) { }

  ngOnInit(): void {
  }

  resetConfig(){
    this.settingsService.setDefaultConfiguration();
    this.sceneService.update();
  }
}
