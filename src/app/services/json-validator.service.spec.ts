import { TestBed } from '@angular/core/testing';

import { JsonValidatorService } from './json-validator.service';

describe('JsonValidatorServiceService', () => {
  let service: JsonValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
