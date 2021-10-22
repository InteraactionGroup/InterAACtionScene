import {Component, OnInit} from '@angular/core';
import {Color} from '../../types';
import {ModeService} from "../../services/mode.service";
import {SceneDisplayService} from "../../services/scene-display.service";
import {ScenesService} from "../../services/scenes.service";
import {AudioRecorderService} from "../../services/audio-recorder.service";
import {LanguageService} from "../../services/language.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutAppComponent} from "../logoutApp/logout-app.component";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  sceneTitle: string;
  hideShowButtonChar = "▲";
  fullScreenPath = 'images/enterfullscreen.png';

  COLORS: Color[] = [
    {name: "white", hex: '#FFFFFF'},
    {name: "black", hex: '#000000'},
    {name: "red", hex: '#f34336'},
    {name: "orange", hex: '#ff7f00'},
    {name: "blue", hex: '#0080ff'},
    {name: "green", hex: '#228b22'},
  ];

  changeMode(mode: string): void {
    this.modeService.currentDrawingTool = '';
    this.modeService.choiceDrawing = '';
    this.modeService.selectedMode = mode;
  }

  changeColor(toolName: string): void {
    this.modeService.choiceDrawing = '';
    this.modeService.currentDrawingTool = toolName;
  }

  choiceDrawing(drawingName: string): void {
    this.modeService.choiceDrawing = drawingName;
  }

  async hideShowMenu() {
    if (this.modeService.displayBar === true) {
      this.modeService.displayBar = false;
      this.modeService.selectedMode = "play";
      this.hideShowButtonChar = "▼";
    } else {
      this.modeService.displayBar = true;
      this.hideShowButtonChar = "▲"
    }
    await this.delay(20);
    this.scenesService.updateScenes();
    this.sceneDisplayService.UpdateDimensions();
  }

  async fullScreen() {
    if (document.fullscreenElement !== null || (document as any).webkitIsFullScreen || (document as any).mozFullScreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      }
      this.fullScreenPath = 'images/enterfullscreen.png';

    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if ((document.documentElement as any).webkitRequestFullscreen) {
        (document.documentElement as any).webkitRequestFullscreen();
      } else if ((document.documentElement as any).mozRequestFullScreen) {
        (document.documentElement as any).mozRequestFullScreen();
      } else if ((document.documentElement as any).webkitEnterFullScreen) {
        (document.documentElement as any).webkitEnterFullScreen();
      }
      this.fullScreenPath = 'images/exitfullscreen.png';
    }

    await this.delay(20);
    this.scenesService.updateScenes();
    this.sceneDisplayService.UpdateDimensions();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onImageChange(imageName: string): void {
    this.sceneTitle = imageName;
  }

  logout(){
    const logoutDialog = this.dialog.open(LogoutAppComponent, {
      width: '500px',
      data: 'Do you want to leaver InterAACtion Scene ?'
    });
    logoutDialog.afterClosed().subscribe(result => {
      if (result) {
        const closeFile = JSON.stringify("");
        const file = new Blob([closeFile], {type: 'text/json'});
        if (window.navigator.msSaveOrOpenBlob) { // IE10+
          window.navigator.msSaveOrOpenBlob(file, 'close161918.txt');
        } else { // Others
          const a = document.createElement('a');
          const url = URL.createObjectURL(file);
          a.href = url;
          a.download = 'close161918.txt';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          }, 0);
        }
      }
    });
  }

  constructor(public modeService: ModeService,
              public scenesService: ScenesService,
              public audioRecorderService: AudioRecorderService,
              public sceneDisplayService: SceneDisplayService,
              public languageService: LanguageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    let lang = location.href.substring(24,26);
    this.languageService.switchLanguage(lang);
  }

}
