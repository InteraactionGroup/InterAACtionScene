import {TestBed} from '@angular/core/testing';

import {SettingsService} from './settings.service';
import {TranslateModule} from "@ngx-translate/core";

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it sets specific variable after calling the function
  it('setDefaultConfiguration:: should set default configs', () => {
    service.setDefaultConfiguration();
    expect(service.SPEECH_SPEAKER).toEqual(service.SPEECH_SPEAKER_DEFAULT);
    expect(service.DWELL_TIME_ENABLED).toEqual(service.DWELL_TIME_ENABLED_DEFAULT);
    expect(service.DWELL_TIME_TIMEOUT_VALUE).toEqual(service.DWELL_TIME_TIMEOUT_VALUE_DEFAULT);
  });
});
