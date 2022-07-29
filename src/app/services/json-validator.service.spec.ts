import {TestBed} from '@angular/core/testing';
import Ajv from 'ajv';

import {JsonValidatorService} from './json-validator.service';

describe('JsonValidatorServiceService', () => {
  let service: JsonValidatorService;
  let ajv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // check if it returns specific error on invalid data
  it('getCheckedGrid:: should check and parse valid grid data', () => {
    expect(service.getCheckedGrid("test")).toBeNull();
    expect(service).toBeTruthy();
  });
});
