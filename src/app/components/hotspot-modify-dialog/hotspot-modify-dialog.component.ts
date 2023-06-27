import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";
import {Hotspot, ImageHotspot, SoundHotspot} from '../../types';
import {AudioRecorderService} from "../../services/audio-recorder.service";
import {LanguageService} from "../../services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-hotspot-create-dialog',
  templateUrl: './hotspot-modify-dialog.component.html',
  styleUrls: ['./hotspot-modify-dialog.component.css']
})
export class HotspotModifyDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() hotspot: Hotspot;
  form: FormGroup;
  selectedSound = null;
  numImage = null;
  name = '';
  error = '';
  svgPath: number[];
  type = "soundAudio";

  constructor(
    public scenesService: ScenesService,
    private formBuilder: FormBuilder,
    public modeService: ModeService,
    public audioRecorderService: AudioRecorderService,
    public languageService: LanguageService,
    private dialogRef: MatDialogRef<HotspotModifyDialogComponent>,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    if (this.hotspot.type === 'soundAudio') {
      this.form = this.formBuilder.group({
        soundSelected: this.hotspot.getData(),
        name: this.hotspot.name,
        color: this.hotspot.strokeColor,
        write: '',
        strokeWidth: this.hotspot.strokeWidth,
        refImage: null
      });
    } else if (this.hotspot.type === 'writeAudio') {
      this.form = this.formBuilder.group({
        soundSelected: '',
        name: this.hotspot.name,
        color: this.hotspot.strokeColor,
        write: this.hotspot.getData(),
        strokeWidth: this.hotspot.strokeWidth,
        refImage: null
      });
    } else if (this.hotspot.type === 'refImage') {
      this.form = this.formBuilder.group({
        soundSelected: '',
        name: this.hotspot.name,
        color: this.hotspot.strokeColor,
        write: '',
        strokeWidth: this.hotspot.strokeWidth,
        refImage: this.hotspot.getData()
      });
    }
  }

  onSoundSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
    this.error = '';
  }

  submit(form) {
    let indexHotspot = this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.indexOf(this.hotspot);
    if (this.scenesService.checkNames(this.selectedScene, this.selectedImage, `${form.value.name}`) || this.hotspot.name === `${form.value.name}`) {
      if (form.value.strokeWidth > 0){
        if (this.hotspot instanceof SoundHotspot) { // Si l'hotspot de base est un SoundHotspot
          if (this.type === "refImage" && form.value.refImage !== null) { // Et qu'il est modifié en un ImageHotspot
            // On modifie l'hotspot en nouvelle instance de ImageHotspot
            this.hotspot = new ImageHotspot(form.value.name, this.hotspot.svgPointArray, form.value.color, this.type,
              form.value.strokeWidth, form.value.refImage);
            this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.splice(indexHotspot, 1, this.hotspot);
          } else { // Sinon, on modifie simplement l'hotspot
            this.hotspot.strokeColor = `${form.value.color}`;
            this.hotspot.type = this.type;
            this.hotspot.name = `${form.value.name}`;
            this.hotspot.strokeWidth = Number(`${form.value.strokeWidth}`);
            if (this.type === 'soundAudio' && this.selectedSound !== '' && this.selectedSound !== null) {
              this.hotspot.setData(this.selectedSound);
            }else if (this.type === 'writeAudio' && `${form.value.write}` !== '' && `${form.value.write}` !== null){
              this.hotspot.setData(`${form.value.write}`);
            }
          }
        } else if (this.hotspot instanceof ImageHotspot) { // Si l'hotspot de base est un ImageHotspot
          if (this.type === "soundAudio" && this.selectedSound !== '' && this.selectedSound !== null) {
            // Et qu'il est mofifié en un SoundHotspot avec un son sélectionné
            // On modifie l'hotspot en une nouvelle instance de SoundHotspot
            this.hotspot = new SoundHotspot(form.value.name, this.hotspot.svgPointArray, form.value.color, this.type,
              form.value.strokeWidth, this.selectedSound);
            this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.splice(indexHotspot, 1, this.hotspot);
          } else if (this.type === "writeAudio" && `${form.value.write}` !== '') {
            // Et qu'il est mofifié en un SoundHotspot avec un son écrit
            // On modifie l'hotspot en une nouvelle instance de SoundHotspot
            this.hotspot = new SoundHotspot(form.value.name, this.hotspot.svgPointArray, form.value.color, this.type,
              form.value.strokeWidth, `${form.value.write}`);
            this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.splice(indexHotspot, 1, this.hotspot);
          } else { // Sinon, on modifie simplement l'hotspot
            this.hotspot.strokeColor = `${form.value.color}`;
            this.hotspot.type = this.type;
            this.hotspot.name = `${form.value.name}`;
            this.hotspot.strokeWidth = Number(`${form.value.strokeWidth}`);
            this.hotspot.setData(form.value.refImage);
          }
        }

        if (this.modeService.modifyiedHotspot != null){
          this.hotspot.svgPointArray = this.svgPath;
        }

        let nameCenter = this.scenesService.nameHotspot;
        this.setModifyValues(`${form.value.name}`, `${form.value.color}`, this.selectedSound, this.numImage, this.type,
          Number(`${form.value.strokeWidth}`));

        if (this.scenesService.modeService.currentDrawingTool === 'redraw'){
          this.deleteOldCenterHotspot();
          this.scenesService.haveAddHotspot = true;
        }
        else {
          this.modifyCenterHotspot(nameCenter);
        }

        this.modeService.selectedMode = 'hotspot';
        this.modeService.modifyiedHotspot = null;
        this.modeService.currentDrawingTool ='modify';

        this.scenesService.updateScenes();
        this.dialogRef.close();
      }else {
        this.error = this.translate.instant("error.stroke");
      }
    }
    else{
      this.error = this.translate.instant('error.name');
    }
  }

  redraw(){
    this.modeService.selectedMode = 'hotspot';
    this.modeService.currentDrawingTool = 'redraw';
    this.modeService.modifyiedHotspot = this.hotspot;
    console.log("redrawing");
  }

  redrawPolyline(){
    this.modeService.choiceDrawing = 'Polyline';
  }

  redrawRectangle(){
    this.modeService.choiceDrawing = 'Rectangle';
  }

  redrawCricle(){
    this.modeService.choiceDrawing = 'Circle';
  }

  close(){
    this.modeService.selectedMode = 'hotspot';
    this.modeService.modifyiedHotspot = null;
    this.modeService.currentDrawingTool ='modify';
  }

  stop(){
    this.audioRecorderService.stopRecording();
    const file = this.audioRecorderService.getRecord();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
    this.error = '';
  }

  setModifyValues(name, color, sound, image, type, strokeWidth){
    this.scenesService.nameHotspot = name;
    this.scenesService.colorHotspot = color;
    this.scenesService.soundHotspot = sound;
    this.scenesService.imageHotspot = image;
    this.scenesService.typeHotspot = type;
    this.scenesService.strokeWidth = strokeWidth;
  }

  deleteOldCenterHotspot(){
    if (this.selectedScene != undefined && this.selectedImage != undefined) {
      this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots =
        this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.filter(x => {
          if (x.name !== this.hotspot.name.concat('', 'Center')){
            return x;
          }
        });
    }
  }

  modifyCenterHotspot(nameCenter){
    this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots =
      this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].hotspots.filter(x => {
        if (x instanceof SoundHotspot && x.name == nameCenter.concat('', 'Center')){
          x.name = this.scenesService.nameHotspot.concat('', 'Center');
          x.strokeColor = this.scenesService.colorHotspot;
          x.base64sound = this.scenesService.soundHotspot;
          return x;
        } else if (x instanceof ImageHotspot && x.name == nameCenter.concat('', 'Center')){
          x.name = this.scenesService.nameHotspot.concat('', 'Center');
          x.strokeColor = this.scenesService.colorHotspot;
          x.numImage = this.scenesService.imageHotspot;
          return x;
        }
        else {
          return x;
        }
      });
  }

  getType() {
    return this.type;
  }

  setType(type){
    this.type = type;
  }
}
