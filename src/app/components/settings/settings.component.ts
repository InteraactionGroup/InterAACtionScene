import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService, public languageService: LanguageService) { }

  selected = 'fr';
  ngOnInit(): void {
  }

  back(){
    history.back();
  }

  getAFSRLogoPNGUrl(s): string {
    return 'url(assets/images/'+ s +'.png)';
  }

}
