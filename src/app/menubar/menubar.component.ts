import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  mode = "play";
  sceneTitle = "Temp";
  displayBar = true;
  hideShowButtonChar = "▲"

  play(): void {
    this.mode = "play";
  }

  hotspot(): void {
    this.mode = "hotspot";
  }


  draw(): void {
    this.mode = "draw";
  }

  hideShowMenu(): void {
    if (this.displayBar === true) {
      this.displayBar = false;
      this.hideShowButtonChar = "▼";
    } else {
      this.displayBar = true;
      this.hideShowButtonChar = "▲"
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
