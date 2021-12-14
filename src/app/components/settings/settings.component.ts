import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
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
              public dialog: MatDialog) { }

  selected = 'fr';
  ngOnInit(): void {
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
