import { Component, OnInit} from '@angular/core';
import { Color } from '../../types';
import {ModeService} from "../../services/mode.service";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  sceneTitle : string;
  hideShowButtonChar = "▲";
  COLORS: Color[] = [
    { name: "white"  , hex: '#FFFFFF' },
    { name: "black"  , hex: '#000000' },
    { name: "red"    , hex: '#f34336' },
    { name: "orange" , hex: '#ff7f00' },
    { name: "blue"   , hex: '#0080ff' },
    { name: "green"  , hex: '#228b22' },
  ];

  changeMode(mode : string): void {
    this.modeService.selectedMode = mode;
  }

  changeColor(toolName: string): void {
    this.modeService.currentDrawingTool = toolName;
  }

  hideShowMenu(): void {
    if (this.modeService.displayBar === true) {
      this.modeService.displayBar = false;
      this.modeService.selectedMode="play";
      this.hideShowButtonChar = "▼";
    } else {
      this.modeService.displayBar = true;
      this.hideShowButtonChar = "▲"
    }
  }

  onImageChange(imageName: string): void {
    this.sceneTitle = imageName;
  }

  constructor(public modeService: ModeService) { }

  ngOnInit(): void {
  }

}
