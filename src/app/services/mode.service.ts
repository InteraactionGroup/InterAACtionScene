import {Injectable} from '@angular/core';
import {Hotspot} from "../types";

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  selectedMode: String = 'play';
  currentDrawingTool = '';
  sizeDrawingTool = 6;
  displayBar = true;
  modifyiedHotspot: Hotspot = null;
  soundType="import";
  choiceDrawing = '';

  constructor() {
  }
}
