import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";
import {AudioRecorderService} from "../../services/audio-recorder.service";
import {LanguageService} from "../../services/language.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-hotspot-create-dialog',
  templateUrl: './hotspot-create-dialog.component.html',
  styleUrls: ['./hotspot-create-dialog.component.css']
})
export class HotspotCreateDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  form: FormGroup;
  selectedSound = null;
  name = '';
  error = '';
  svgPath: number[];
  type = "soundAudio";

  constructor(
    public scenesService: ScenesService,
    private formBuilder: FormBuilder,
    public modeService: ModeService,
    public audioRecorderService: AudioRecorderService,
    private dialogRef: MatDialogRef<HotspotCreateDialogComponent>,
    public languageService: LanguageService,
    public translate: TranslateService
  ) {
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        soundSelected: '',
        name: '',
        color: '#0080ff',
        write: '',
        strokeWidth: '2',
        refImage: 0
      });
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

  audioIsValid(){
    return this.selectedSound.startsWith('data:audio/mpeg;base64') || this.selectedSound.startsWith('data:audio/wav');
  }

  submit(form) {
    if (this.type == "soundAudio"){
      console.log(form.value.color);
      if (this.selectedSound != null && this.audioIsValid()) {
        if (Number(`${form.value.strokeWidth}`) > 0){
          if (this.scenesService.checkNames(this.selectedScene, this.selectedImage, `${form.value.name}`) && `${form.value.name}` != "") {
            this.setValues(`${form.value.name}`, `${form.value.color}`, this.selectedSound, this.type, Number(`${form.value.strokeWidth}`));
            this.scenesService.addHotspotSound(this.selectedScene, this.selectedImage, `${form.value.name}`,
              this.svgPath, `${form.value.color}`, this.type, Number(`${form.value.strokeWidth}`), this.selectedSound);
            this.dialogRef.close();
          }else{
            this.error = this.translate.instant('error.name');
          }
        }else {
          this.error = this.translate.instant("error.stroke");
        }
      }else {
        this.error = this.translate.instant('error.audio');
      }
    }else if (this.type == "writeAudio"){
      console.log(form.value.color);
      if (`${form.value.write}` != ""){
        if (Number(`${form.value.strokeWidth}`) > 0){
          if (this.scenesService.checkNames(this.selectedScene, this.selectedImage, `${form.value.name}`) && `${form.value.name}` != "") {
            this.setValues(`${form.value.name}`, `${form.value.color}`, `${form.value.write}`, this.type, Number(`${form.value.strokeWidth}`));
            this.scenesService.addHotspotSound(this.selectedScene, this.selectedImage, `${form.value.name}`,
              this.svgPath, `${form.value.color}`, this.type, Number(`${form.value.strokeWidth}`), `${form.value.write}`);
            this.dialogRef.close();
          }else {
            this.error = this.translate.instant('error.name');
          }
        }else {
          this.error = this.translate.instant("error.stroke");
        }
      }else {
        this.error = this.translate.instant('error.text');
      }
    } else {
      console.log(form.value.refImage);
      if (form.value.refImage != null) {
        if (Number(`${form.value.strokeWidth}`) > 0){
          if (this.scenesService.checkNames(this.selectedScene, this.selectedImage, `${form.value.name}`) && `${form.value.name}` != "") {
            this.setValues(`${form.value.name}`, `${form.value.color}`, form.value.refImage, this.type, Number(`${form.value.strokeWidth}`));
            this.scenesService.addHotspotImage(this.selectedScene, this.selectedImage, `${form.value.name}`,
              this.svgPath, `${form.value.color}`, this.type, Number(`${form.value.strokeWidth}`), form.value.refImage);
            this.dialogRef.close();
          }else {
            this.error = this.translate.instant('error.name');
          }
        }else {
          this.error = this.translate.instant("error.stroke");
        }
      } else {
        this.error = this.translate.instant('error.image');
      }
    }
  }

  setValues(name, color, actionHotspot, type, strokeWidth){
    if (type === 'soundAudio' || type === 'writeAudio') {
      this.scenesService.nameHotspot = name;
      this.scenesService.colorHotspot = color;
      this.scenesService.soundHotspot = actionHotspot;
      this.scenesService.typeHotspot = type;
      this.scenesService.strokeWidth = strokeWidth;
    } else if (type === 'refImage') {
      this.scenesService.nameHotspot = name;
      this.scenesService.colorHotspot = color;
      this.scenesService.imageHotspot = actionHotspot;
      this.scenesService.typeHotspot = type;
      this.scenesService.strokeWidth = strokeWidth;
    }
  }

  getType() {
    return this.type;
  }

  setType(type){
    this.type = type;
  }
}
