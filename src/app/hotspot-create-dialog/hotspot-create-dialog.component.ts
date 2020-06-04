import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
  error: string = "";

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<HotspotCreateDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      soundSelected: ''
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
  }


  submit(form) {
    if (this.selectedSound != null) {
      console.log(this.selectedSound);

    }
  }

}
