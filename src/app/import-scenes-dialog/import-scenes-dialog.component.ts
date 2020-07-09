import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { ScenesService } from '../scenes.service';
import { Scene,SceneImage } from '../types';


@Component({
  selector: 'app-import-scenes-dialog',
  templateUrl: './import-scenes-dialog.component.html',
  styleUrls: ['./import-scenes-dialog.component.css']
})
export class ImportScenesDialogComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;
  error: string = "";

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ImportScenesDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fileSelected: ''
    })
  }

  onFileSelected(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = () => {
      this.selectedFile = reader.result;
    };

    reader.onerror = function (error) {
     console.log('Error: ', error);
    };
  }


  submit(form) {
    if (this.selectedFile != null) {
      try {
        let scenes = JSON.parse(this.selectedFile);
        if(scenes as Array<Scene>){
          this.scenesService.setScenesFromJSON(scenes);
          this.dialogRef.close();
        }
      } catch (error) {
        this.error = "Invalid file."
      }
    }
  }

}
