import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {SceneDisplayService} from '../../services/scene-display.service';
import {Hotspot, SoundHotspot, ImageHotspot} from '../../types';
import {ModeService} from "../../services/mode.service";
import {MatDialog} from "@angular/material/dialog";
import {HotspotModifyDialogComponent} from "../hotspot-modify-dialog/hotspot-modify-dialog.component";
import {HotspotDeleteDialogComponent} from "../hotspot-delete-dialog/hotspot-delete-dialog.component";
import {DwellCursorService} from "../../services/dwell-cursor.service";
import {SettingsService} from "../../services/settings.service";
import {LanguageService} from "../../services/language.service";
import {switchMap} from 'rxjs/operators';

declare const SVG: any;

@Component({
  selector: 'app-hotspot-display',
  templateUrl: './hotspot-display.component.html',
  styleUrls: ['./hotspot-display.component.css']
})
export class HotspotDisplayComponent implements OnInit {

  drawing: any;
  @Input() public width: number;
  @Input() public height: number;
  @Input() public selectedScene: number;
  @Input() public selectedImage: number;
  @ViewChild("hotspot", {static: true}) hotspot: ElementRef;

  dwellTimer;

  audioPlayer = new Audio();

  constructor(
    public scenesService: ScenesService,
    public sceneDisplayService: SceneDisplayService,
    private dialog: MatDialog,
    public dwellCursorService: DwellCursorService,
    public modeService: ModeService,
    public settingsService: SettingsService,
    public languageService: LanguageService
  ) {
  }

  getHotspots(): Hotspot[] {
    if (this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage) != null && this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage).length > 0) {
      return this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage);
    } else {
      return [];
    }
  }

  getPoints(hotspot: Hotspot) {
    let pathStr = "";
    for (let j = 0; j < hotspot.svgPointArray.length - 1; j = j + 2) {

      if ((hotspot.svgPointArray[j] * this.width).toString().toLowerCase() !== "nan" &&
        (hotspot.svgPointArray[j + 1] * this.height).toString().toLowerCase() !== "nan") {

        pathStr += (hotspot.svgPointArray[j] * this.width).toString() + ",";
        pathStr += (hotspot.svgPointArray[j + 1] * this.height).toString() + " ";

      }
    }
    return pathStr
  }

  getPointsInNumber(hotspot: Hotspot) {
    let points = [];
    for (let j = 0; j < hotspot.svgPointArray.length - 1; j = j + 2) {

      if ((hotspot.svgPointArray[j] * this.width).toString().toLowerCase() !== "nan" &&
        (hotspot.svgPointArray[j + 1] * this.height).toString().toLowerCase() !== "nan") {

        let point = {
          x: (hotspot.svgPointArray[j] * this.width),
          y: (hotspot.svgPointArray[j + 1] * this.height)
        };

        points.push(point);
      }
    }
    return points;
  }

  ngOnInit(): void {
  }

  PlayHotspot(hotspot: Hotspot) {
    if (hotspot instanceof SoundHotspot) {
      if (hotspot.type === "soundAudio") {
        this.audioPlayer.src = hotspot.base64sound;
        this.audioPlayer.volume = this.settingsService.VOLUME;
        this.audioPlayer.load();
        this.audioPlayer.play();
      } else if (hotspot.type === "writeAudio") {
        let speak = new SpeechSynthesisUtterance(hotspot.base64sound);
        speak.lang = this.languageService.activeSpeechSpeakerLanguage;
        speak.volume = this.settingsService.VOLUME;
        window.speechSynthesis.speak(speak);
      }
    } else if (hotspot instanceof ImageHotspot) {
      console.log('Dans PlayHotspot ' + this.scenesService.SCENES);
      this.sceneDisplayService.selectedImage = hotspot.numImage;
      this.scenesService.updateScenes();
      console.log('Avant UpdateDimensions' + this.scenesService.SCENES);
      this.sceneDisplayService.UpdateDimensions();
    }

  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  enterEvent(event, hotspot) {
    let nameHotspot = hotspot.name;
    event.target.setAttribute("fill", hotspot.strokeColor);
    event.target.setAttribute('fill-opacity', "0.5");
    //if (hotspot.name.includes('Center')){
      let textCenter = document.querySelector('#textCenter');
      nameHotspot = hotspot.name.replace('Center', '');
      textCenter.textContent = hotspot.name.replace('Center', '');
      textCenter.setAttribute('x', String(event.offsetX));
      textCenter.setAttribute('y', String(event.offsetY - 10));
      textCenter.setAttribute('class', 'showText');
      textCenter.setAttribute('filter', 'url(#background)');
    //}
    if (this.settingsService.SPEECH_SPEAKER && this.modeService.selectedMode !== 'hotspot' && this.modeService.currentDrawingTool !== 'modify' && this.modeService.currentDrawingTool !== 'delete') {
      let speechSpeakerName = new SpeechSynthesisUtterance(nameHotspot);
      speechSpeakerName.lang = this.languageService.activeSpeechSpeakerLanguage;
      window.speechSynthesis.speak(speechSpeakerName);
    }
  };

  leaveEvent(event, hotspot) {
    event.target.setAttribute("fill", '#000000');
    event.target.setAttribute('fill-opacity', "0.0");
    //if (hotspot.name.includes('Center')){
      let textCenter = document.querySelector('#textCenter');
      textCenter.setAttribute('class', 'hideText');
      textCenter.setAttribute('filter', '');
    //}
  };

  clickEvent(event, hotspot: Hotspot) {
    if (this.modeService.selectedMode === 'hotspot' && this.modeService.currentDrawingTool === 'modify') {
      const dialogRef = this.dialog.open(HotspotModifyDialogComponent, {
        width: '400px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.hotspot = hotspot;

      dialogRef.afterClosed().subscribe(result => {
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });

    } else if (this.modeService.selectedMode === 'hotspot' && this.modeService.currentDrawingTool === 'delete') {
      const dialogRef = this.dialog.open(HotspotDeleteDialogComponent, {
        width: '400px',
      });
      dialogRef.componentInstance.selectedScene = this.selectedScene;
      dialogRef.componentInstance.selectedImage = this.selectedImage;
      dialogRef.componentInstance.poly = event.target;
      dialogRef.componentInstance.hotspot = hotspot;

      dialogRef.afterClosed().subscribe(result => {
        this.modeService.selectedMode = 'hotspot';
        this.modeService.soundType ='import';
      });
    } else {
      this.PlayHotspot(hotspot);
    }
  }

  getColor(index) {
    if (this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage) !== undefined && this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage).length > index) {
      return this.scenesService.getImageHotspots(this.selectedScene, this.selectedImage)[index].strokeColor;
    }
    return 'black';
  }

  enter(event: PointerEvent, hotspot: SoundHotspot | ImageHotspot) {
    if (this.settingsService.DWELL_TIME_ENABLED) {
      this.dwellCursorService.updatePositionSVGPolygonElement((<HTMLElement>event.target), this.getPointsInNumber(hotspot));
      this.dwellCursorService.playToMax(this.settingsService.DWELL_TIME_TIMEOUT_VALUE);
      this.dwellTimer = window.setTimeout(() => {
        this.PlayHotspot(hotspot);
      }, this.settingsService.DWELL_TIME_TIMEOUT_VALUE);
    }
  }

  exit() {
    if (this.settingsService.DWELL_TIME_ENABLED) {
      this.dwellCursorService.stop();
      window.clearTimeout(this.dwellTimer);
    }
  }

}
