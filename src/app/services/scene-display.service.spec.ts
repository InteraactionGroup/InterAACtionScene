import { TestBed } from '@angular/core/testing';

import { SceneDisplayService } from './scene-display.service';

describe('SceneDisplayService', () => {
  let service: SceneDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
