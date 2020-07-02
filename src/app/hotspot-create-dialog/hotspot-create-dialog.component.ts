import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { ScenesService } from '../scenes.service';
import { Scene,SceneImage } from '../types';

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
  name: string = "";
  error: string = "";
  svgPath : number[];
  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotspotCreateDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      soundSelected: '',
      name: '',
      color: ''
    })
  }

  onSoundSelected(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedSound = reader.result;
    };

    reader.onerror = function (error) {
     console.log('Error: ', error);
    };
    this.error = "";
  }


  submit(form) {

    if (this.selectedSound != null && this.selectedSound.startsWith("data:audio/mpeg;base64")) {
      console.log(this.selectedSound);
      this.scenesService.addHotspot(this.selectedScene,this.selectedImage,`${form.value.name}`,this.svgPath,`${form.value.color}`,this.selectedSound);
      this.dialogRef.close();
    } else {
      this.error = "Invalid audio file";
    }
  }

}
