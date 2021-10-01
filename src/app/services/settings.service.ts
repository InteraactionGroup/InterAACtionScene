import {Injectable} from '@angular/core';
import {Configuration} from "../types";

@Injectable({
  providedIn: 'root'
})

export class SettingsService {

  SPEECH_SPEAKER = false;
  DWELL_TIME_ENABLED = false;
  DWELL_TIME_TIMEOUT_VALUE = 500;

  constructor() {
  }

  setConfiguration(configuration: Configuration){
    this.DWELL_TIME_ENABLED = configuration.DWELL_TIME_ENABLED;
    this.DWELL_TIME_TIMEOUT_VALUE = configuration.DWELL_TIME_TIMEOUT_VALUE;
  }

  getConfiguration(): Configuration{
    return {
      'DWELL_TIME_ENABLED': this.DWELL_TIME_ENABLED,
      'DWELL_TIME_TIMEOUT_VALUE': this.DWELL_TIME_TIMEOUT_VALUE
    }
  }

}
