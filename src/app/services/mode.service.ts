import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  selectedMode: String = 'play';
  currentDrawingTool = '';
  displayBar = true;

  constructor() {
  }
}
