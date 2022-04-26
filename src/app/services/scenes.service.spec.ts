import {TestBed} from '@angular/core/testing';

import {ScenesService} from './scenes.service';
import {TranslateModule} from '@ngx-translate/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('ScenesService', () => {
  let service: ScenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterTestingModule]
    });
    service = TestBed.inject(ScenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
