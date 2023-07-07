import {Component, OnInit} from '@angular/core';
import {DwellCursorService} from "../../services/dwell-cursor.service";
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'app-dwell-cursor',
  templateUrl: './dwell-cursor.component.html',
  styleUrls: ['./dwell-cursor.component.css']
})
export class DwellCursorComponent implements OnInit {

  changeSpinner: boolean = true;
  spinner1Value: number = 0;
  spinner2Value: number = 0;

  constructor(public dwellCursorService: DwellCursorService,
              public settingsService: SettingsService) {

  }

  ngOnInit(): void {
    const cursor = document.getElementById('cursor');
    document.addEventListener('mousemove', e => {
      if (this.settingsService.DWELL_TIME_ENABLED) {
        //cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;opacity:" + this.getCursorOpacity())
        cursor.setAttribute("style", "top: " + this.dwellCursorService.y + "px; left: " + this.dwellCursorService.x + "px;opacity:" + this.getCursorOpacity())
      }
    });

    this.dwellCursorService.spinnerChoiceObservable.subscribe(value => {
      this.changeSpinner = value;
    });

    this.dwellCursorService.spinnerValueObservable.subscribe(value => {
      if (this.changeSpinner){
        this.spinner1Value = value;
        this.spinner2Value = 0;
      }else {
        this.spinner1Value = 0;
        this.spinner2Value = value;
      }
    });
  }

  public getCursorOpacity() {
    return (this.settingsService.DWELL_TIME_ENABLED && this.dwellCursorService.visible && this.dwellCursorService.started) ? '1' : '0'
  }

}
