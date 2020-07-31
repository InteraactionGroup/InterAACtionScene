import {Injectable} from '@angular/core';
// @ts-ignore
import Ajv from 'ajv';
// @ts-ignore
import schema from '../../assets/saveSchema.json';
import {Scene} from '../types';

@Injectable({
  providedIn: 'root'
})
export class JsonValidatorService {

  constructor() { }

  getCheckedGrid(dataToValidate): Scene[] {
    const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
    const validate = ajv.compile(schema);
    const valid = validate(dataToValidate);
    if (!valid) {
      console.log('ERROR WHEN PARSING THE GRID:');
      console.log(validate.errors);
      throw new Error('JSON file has invalid format');
    } else {
      console.log('PARSING SUCCESSFUL');
      return dataToValidate;
    }
  }

}
