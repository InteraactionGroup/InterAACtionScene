import {TestBed} from '@angular/core/testing';

import {ScenesService} from './scenes.service';
import {TranslateModule} from '@ngx-translate/core';

describe('ScenesService', () => {
  let service: ScenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()]
    });
    service = TestBed.inject(ScenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
