import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {ModeService} from "../../services/mode.service";
import {AudioRecorderService} from "../../services/audio-recorder.service";

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

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    public modeService: ModeService,
    public audioRecorderService: AudioRecorderService,
    private dialogRef: MatDialogRef<HotspotCreateDialogComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.modeService.redrawnHotspot!=null){
      this.form = this.formBuilder.group({
        soundSelected: '',
        name: this.modeService.redrawnHotspot.name,
        color: this.modeService.redrawnHotspot.strokeColor
      });
    } else {
      this.form = this.formBuilder.group({
        soundSelected: '',
        name: '',
        color: ''
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
    if (this.modeService.redrawnHotspot !== null) {
      if (this.selectedSound != null && this.audioIsValid()) {
        this.scenesService.changeHotspot(this.selectedScene, this.selectedImage, `${form.value.name}`,
          this.svgPath, `${form.value.color}`, this.selectedSound);
        this.dialogRef.close();
        this.modeService.currentDrawingTool = '';
      } else {
        this.scenesService.changeHotspot(this.selectedScene, this.selectedImage, `${form.value.name}`,
          this.svgPath, `${form.value.color}`, this.modeService.redrawnHotspot.base64sound);
        this.dialogRef.close();
        this.modeService.currentDrawingTool = '';
      }
    } else {
      if (this.selectedSound != null && this.audioIsValid()) {
      this.scenesService.addHotspot(this.selectedScene, this.selectedImage, `${form.value.name}`,
        this.svgPath, `${form.value.color}`, this.selectedSound);
      this.dialogRef.close();
      this.modeService.currentDrawingTool = '';
      } else {
        this.error = 'Invalid audio file';
      }
    }
  }

}
