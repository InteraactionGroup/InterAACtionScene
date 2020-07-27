import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ScenesService } from '../scenes.service';

@Component({
  selector: 'app-add-scene-dialog',
  templateUrl: './add-scene-dialog.component.html',
  styleUrls: ['./add-scene-dialog.component.css']
})
export class AddSceneDialogComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSceneDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      scenename: '',
      firstimagename: ''
    })
  }

  onFileSelected(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
    };

    reader.onerror = function (error) {
     console.log('Error: ', error);
    };

  }

  submit(form) {
    if (this.selectedFile != null) {
      this.scenesService.addScene(this.selectedFile,`${form.value.scenename}`,`${form.value.firstimagename}`)
    }
    //this.scenesService.addScene(,`${form.value.scenename}`);
    this.dialogRef.close();
  }

}
