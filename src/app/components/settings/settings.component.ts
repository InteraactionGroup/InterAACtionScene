import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
import {ScenesService} from "../../services/scenes.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public languageService: LanguageService,
              private sceneService: ScenesService) {
  }

  selected;
  ngOnInit(): void {
    setTimeout(() => {
      this.selected = this.languageService.activeLanguage;
    }, 500);
  }

  saveConfig(){
    this.sceneService.update();
  }

  back(){
    history.back();
  }

}
