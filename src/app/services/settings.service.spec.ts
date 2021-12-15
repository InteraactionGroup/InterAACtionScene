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
});
