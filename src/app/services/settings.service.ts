import {Injectable} from '@angular/core';
import {Configuration} from "../types";
import {LanguageService} from "./language.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  VERSION = "";
  JsonFile: any;

  AFSR = false;

  SPEECH_SPEAKER = false;
  DWELL_TIME_ENABLED = false;
  DWELL_TIME_TIMEOUT_VALUE = 500;

  SPEECH_SPEAKER_DEFAULT = false;
  DWELL_TIME_ENABLED_DEFAULT = false;
  DWELL_TIME_TIMEOUT_VALUE_DEFAULT = 500;

  VOLUME = 1;

  constructor(private languageService: LanguageService,
              private http: HttpClient) {
    this.setVersion();
  }

  setVersion(){
    this.http.get("https://api.github.com/repos/AFSR/InteraactionScene-AFSR/releases/latest").subscribe(data => {
      this.VERSION = data["name"] + " Dev v." + data["created_at"].substring(0, 10).replace("-", ".");
    })
  }

  setConfiguration(configuration: Configuration){
    this.VOLUME = configuration.VOLUME;
    this.DWELL_TIME_ENABLED = configuration.DWELL_TIME_ENABLED;
    this.DWELL_TIME_TIMEOUT_VALUE = configuration.DWELL_TIME_TIMEOUT_VALUE;
    this.SPEECH_SPEAKER = configuration.SPEECH_SPEAKER_ENABLE;
    this.languageService.switchLanguage(configuration.LANGUAGE_CHOICE);
  }

  setDefaultConfiguration(){
    this.VOLUME = 1;
    this.SPEECH_SPEAKER = this.SPEECH_SPEAKER_DEFAULT;
    this.DWELL_TIME_ENABLED = this.DWELL_TIME_ENABLED_DEFAULT;
    this.DWELL_TIME_TIMEOUT_VALUE = this.DWELL_TIME_TIMEOUT_VALUE_DEFAULT;
  }

  getConfiguration(): Configuration{
    return {
      'VOLUME': this.VOLUME,
      'DWELL_TIME_ENABLED': this.DWELL_TIME_ENABLED,
      'DWELL_TIME_TIMEOUT_VALUE': this.DWELL_TIME_TIMEOUT_VALUE,
      'SPEECH_SPEAKER_ENABLE': this.SPEECH_SPEAKER,
      'LANGUAGE_CHOICE': this.languageService.activeLanguage
    }
  }
}
