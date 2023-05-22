import {Component, OnInit} from '@angular/core';
import {Color} from '../../types';
import {ModeService} from "../../services/mode.service";
import {SceneDisplayService} from "../../services/scene-display.service";
import {ScenesService} from "../../services/scenes.service";
import {AudioRecorderService} from "../../services/audio-recorder.service";
import {LanguageService} from "../../services/language.service";
import {MatDialog} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {LogoutAppComponent} from '../logoutApp/logout-app.component';
import {SettingsService} from '../../services/settings.service';
import {DialogTutorialComponent} from '../dialog-tutorial/dialog-tutorial.component';
import {DialogResetScenesComponent} from '../dialog-reset-scenes/dialog-reset-scenes.component';
import {HotspotModifyDialogComponent} from '../hotspot-modify-dialog/hotspot-modify-dialog.component';
import {HotspotCreateDialogComponent} from '../hotspot-create-dialog/hotspot-create-dialog.component';
import {HotspotDeleteDialogComponent} from '../hotspot-delete-dialog/hotspot-delete-dialog.component';
import {HotspotDeleteAllComponent} from '../hotspot-delete-all-dialog/hotspot-delete-all.component';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  sceneTitle: string;
  hideShowButtonChar = "▲";
  hideShowButtonChar2 = "◄"
  positionPanelButton = "";
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
    await this.delay(1000);
    this.scenesService.updateScenes();
    this.sceneDisplayService.UpdateDimensions();
  }

  async hideShowPanel(){
    if (this.sceneDisplayService.hidePanel === false){
      this.sceneDisplayService.hidePanel = true;
      this.hideShowButtonChar2 = "►";
      this.sceneDisplayService.emitBigImageContainer("fitImageContainer");
      this.sceneDisplayService.emitHideShowPanelButton("positionHideShowButtonPanel");
    }else {
      this.sceneDisplayService.hidePanel = false;
      this.hideShowButtonChar2 = "◄";
      this.sceneDisplayService.emitBigImageContainer("");
      this.sceneDisplayService.emitHideShowPanelButton("");
    }
  }

  // Ignoring in test as can not reproduce all browsers in chromeHeadless
  /* istanbul ignore next */
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

    await this.delay(1000);
    this.scenesService.updateScenes();
    this.sceneDisplayService.UpdateDimensions();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  onImageChange(imageName: string): void {
    this.sceneTitle = imageName;
  }

  logout() : void{
    this.dialog.open(LogoutAppComponent);
  }

  openDialogTuto(): void{
    this.dialog.open(DialogTutorialComponent, {
      height: '75%',
      width: '75%'
    });
  }

  openDialogReset(): void{
    this.dialog.open(DialogResetScenesComponent, {
      height: '150px',
      width: '200px'
    }).afterClosed().subscribe(result => {
      this.sceneDisplayService.selectedScene = 0;
      this.sceneDisplayService.selectedImage = 0;
    });
  }

  deleteAllHotspots(): void{
    let dialogRef = this.dialog.open(HotspotDeleteAllComponent, {
      height: '150px',
      width: '200px'
    });
  }

  constructor(public modeService: ModeService,
              public scenesService: ScenesService,
              public audioRecorderService: AudioRecorderService,
              public sceneDisplayService: SceneDisplayService,
              public languageService: LanguageService,
              private dialog: MatDialog,
              public settingsService: SettingsService) {
  }

  ngOnInit(): void {
    this.sceneDisplayService.hideShowPanelButtonObservable.subscribe(value => {
      this.positionPanelButton = value;
    });
    setTimeout(() => {
      this.scenesService.updateScenes();
      this.sceneDisplayService.UpdateDimensions();
    }, 1000)
  }

}
