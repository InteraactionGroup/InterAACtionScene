import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {LanguageService} from '../../services/language.service';
import {ScenesService} from "../../services/scenes.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogResetSettingsComponent} from "../dialog-reset-settings/dialog-reset-settings.component";
import {DialogLinkInteraactionboxComponent} from '../dialog-link-interaactionbox/dialog-link-interaactionbox.component';
import {DisplaySiteASFRComponent} from '../display-site-asfr/display-site-asfr.component';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selected;
  dwellTime = 0;
  dwellTimeError = false;

  constructor(public settingsService: SettingsService,
              public languageService: LanguageService,
              public sceneService: ScenesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dwellTimeError = false;
    setTimeout(() => {
      this.selected = this.languageService.activeLanguage;
      this.dwellTime = this.settingsService.DWELL_TIME_TIMEOUT_VALUE;
    }, 500);
  }

  checkValue(){
    if ((this.dwellTime >= 0) && (this.dwellTime <= 5000)){
      this.dwellTimeError = false;
      this.settingsService.DWELL_TIME_TIMEOUT_VALUE = this.dwellTime;
      this.saveConfig();
    }else {
      this.dwellTimeError = true;
    }
  }

  getVolume(){
    return Math.round(this.settingsService.VOLUME * 100);
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
    }).afterClosed().subscribe(result => {
      this.dwellTime = this.settingsService.DWELL_TIME_TIMEOUT_VALUE;
    });
  }

  openDialogASFR() {
    this.dialog.open(DisplaySiteASFRComponent,{
      height: '90%',
      width: '90%'
    });
  }

  openDialogInteraactionBoxAFSR(){
    this.dialog.open(DialogLinkInteraactionboxComponent,{
      height: '90%',
      width: '90%'
    });
  }

  getAFSRLogoPNGUrl(s): string {
    return 'url(assets/images/'+ s +'.png)';
  }

}
