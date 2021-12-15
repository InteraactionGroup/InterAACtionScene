import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
import {ScenesService} from "../../services/scenes.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogResetSettingsComponent} from "../dialog-reset-settings/dialog-reset-settings.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService,
              public languageService: LanguageService,
              public sceneService: ScenesService,
              public dialog: MatDialog) { }

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

  openDialog():void {
    this.dialog.open(DialogResetSettingsComponent, {
      height: '150px',
      width: '200px'
    });
  }

}
