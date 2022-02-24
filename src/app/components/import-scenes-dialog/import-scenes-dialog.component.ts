import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {Scene} from '../../types';
import {JsonValidatorService} from '../../services/json-validator.service';


@Component({
  selector: 'app-import-scenes-dialog',
  templateUrl: './import-scenes-dialog.component.html',
  styleUrls: ['./import-scenes-dialog.component.css']
})
export class ImportScenesDialogComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;
  extensionSelectedFile = null;
  error = '';

  constructor(
    private scenesService: ScenesService,
    private jsonValidatorService: JsonValidatorService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ImportScenesDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fileSelected: ''
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    this.extensionSelectedFile = file.name.split('.').pop();
    const reader = new FileReader();
    reader.readAsText(file, 'UTF-8');
    reader.onload = () => {
      this.selectedFile = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }


  submit(form) {
    if (this.selectedFile != null && this.extensionSelectedFile == "scene") {
      try {
        const scenes = this.jsonValidatorService.getCheckedGrid(JSON.parse(this.selectedFile));
        if (scenes as Array<Scene>) {
          this.scenesService.SCENES = scenes;
          this.scenesService.updateScenes();
          this.dialogRef.close();
        }
      } catch (error) {
        this.error = 'Invalid file.';
      }
    }else {
      this.error = 'Invalid file, only .scene file !';
    }
  }

}
