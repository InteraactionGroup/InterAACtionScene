import {Injectable} from '@angular/core';
import {Hotspot} from "../types";

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  selectedMode: String = 'play';
  currentDrawingTool = '';
  displayBar = true;
  redrawnHotspot: Hotspot = null;
  soundType="";

  constructor() {
  }
}
