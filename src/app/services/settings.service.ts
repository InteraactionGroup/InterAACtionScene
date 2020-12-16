import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  // SETTINGS : Array<> = [
  //   {ShowSceneName: true},
  // ];


  DWELL_TIME_ENABLED = false;
  DWELL_TIME_TIMEOUT_VALUE = 500;

  constructor() {
  }
}
