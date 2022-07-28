import {TestBed} from '@angular/core/testing';

import {JsonValidatorService} from './json-validator.service';

describe('JsonValidatorServiceService', () => {
  let service: JsonValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it returns specific error on invalid data
  it('getCheckedGrid:: should check and parse valid grid data', () => {
    const value = service.getCheckedGrid("test")
    expect(value).toBeNull();
    expect(service).toBeTruthy();
  });
});
