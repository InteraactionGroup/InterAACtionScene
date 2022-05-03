import {Injectable} from '@angular/core';
import {Configuration} from "../types";
import {LanguageService} from "./language.service";

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  VERSION = "InterAACtionScene v.2022.05.03";

  AFSR = false;

  SPEECH_SPEAKER = false;
  DWELL_TIME_ENABLED = false;
  DWELL_TIME_TIMEOUT_VALUE = 500;

   SPEECH_SPEAKER_DEFAULT = false;
  DWELL_TIME_ENABLED_DEFAULT = false;
  DWELL_TIME_TIMEOUT_VALUE_DEFAULT = 500;

  constructor(private languageService: LanguageService) {
  }

  setConfiguration(configuration: Configuration){
    this.DWELL_TIME_ENABLED = configuration.DWELL_TIME_ENABLED;
    this.DWELL_TIME_TIMEOUT_VALUE = configuration.DWELL_TIME_TIMEOUT_VALUE;
    this.SPEECH_SPEAKER = configuration.SPEECH_SPEAKER_ENABLE;
    this.languageService.switchLanguage(configuration.LANGUAGE_CHOICE);
  }

  setDefaultConfiguration(){
    this.SPEECH_SPEAKER = this.SPEECH_SPEAKER_DEFAULT;
    this.DWELL_TIME_ENABLED = this.DWELL_TIME_ENABLED_DEFAULT;
    this.DWELL_TIME_TIMEOUT_VALUE = this.DWELL_TIME_TIMEOUT_VALUE_DEFAULT;
  }

  getConfiguration(): Configuration{
    return {
      'DWELL_TIME_ENABLED': this.DWELL_TIME_ENABLED,
      'DWELL_TIME_TIMEOUT_VALUE': this.DWELL_TIME_TIMEOUT_VALUE,
      'SPEECH_SPEAKER_ENABLE': this.SPEECH_SPEAKER,
      'LANGUAGE_CHOICE': this.languageService.activeLanguage
    }
  }
}
