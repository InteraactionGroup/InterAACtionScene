import { TestBed } from '@angular/core/testing';

import { LanguageService } from './language.service';
import {TranslateModule} from '@ngx-translate/core';

describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.inject(LanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it sets specific variables after calling the function
  it('switchSpeechSpeakerLanguage:: should set language', () => {
    service.activeLanguage = 'en';
    service.switchSpeechSpeakerLanguage();
    expect(service.activeSpeechSpeakerLanguage).toEqual('en-GB');
    service.activeLanguage = null;
    service.switchSpeechSpeakerLanguage();
    expect(service.activeSpeechSpeakerLanguage).toEqual('en-GB');
  });
});
