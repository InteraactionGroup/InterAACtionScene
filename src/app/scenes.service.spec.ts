import { TestBed } from '@angular/core/testing';

import { ScenesService } from './scenes.service';

describe('ScenesService', () => {
  let service: ScenesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
