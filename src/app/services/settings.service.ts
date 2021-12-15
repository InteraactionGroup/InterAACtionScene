import {Injectable} from '@angular/core';
import {Configuration} from "../types";

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  VERSION = "InteraactionScene v.2021.11.17";

  SPEECH_SPEAKER = false;
  DWELL_TIME_ENABLED = false;
  DWELL_TIME_TIMEOUT_VALUE = 500;

  SPEECH_SPEAKER_DEFAULT = false;
  DWELL_TIME_ENABLED_DEFAULT = false;
  DWELL_TIME_TIMEOUT_VALUE_DEFAULT = 500;

  constructor() {
  }

  setConfiguration(configuration: Configuration){
    this.DWELL_TIME_ENABLED = configuration.DWELL_TIME_ENABLED;
    this.DWELL_TIME_TIMEOUT_VALUE = configuration.DWELL_TIME_TIMEOUT_VALUE;
  }

  setDefaultConfiguration(){
    this.SPEECH_SPEAKER = this.SPEECH_SPEAKER_DEFAULT;
    this.DWELL_TIME_ENABLED = this.DWELL_TIME_ENABLED_DEFAULT;
    this.DWELL_TIME_TIMEOUT_VALUE = this.DWELL_TIME_TIMEOUT_VALUE_DEFAULT;
  }

  getConfiguration(): Configuration{
    return {
      'DWELL_TIME_ENABLED': this.DWELL_TIME_ENABLED,
      'DWELL_TIME_TIMEOUT_VALUE': this.DWELL_TIME_TIMEOUT_VALUE
    }
  }

}
