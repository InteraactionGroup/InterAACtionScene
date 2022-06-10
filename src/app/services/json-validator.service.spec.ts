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
    // tslint:disable-next-line:only-arrow-functions
    expect(function(){service.getCheckedGrid('test'); }).toThrow(new Error('JSON file has invalid format'));
    expect(service).toBeTruthy();
  });
});
