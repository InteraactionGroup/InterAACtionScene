import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public activeLanguage = 'en';
  public activeSpeechSpeakerLanguage = 'en-GB';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.activeLanguage);
  }

  public switchLanguage(language: string){
    this.activeLanguage = language;
    this.translate.use(language);
  }

  public switchSpeechSpeakerLanguage(){
    if (this.activeLanguage == 'en'){
      this.activeSpeechSpeakerLanguage = "en-GB";
    }else if (this.activeLanguage == 'fr'){
      this.activeSpeechSpeakerLanguage = "fr-FR";
    }
  }
}
