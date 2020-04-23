import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { ScenesService } from '../scenes.service';

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {

  form: FormGroup;
  selectedFile = null;
  @Input() sceneNumber: number;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddImageDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      imagename: ''
    })
  }

  onFileSelected(event) {
    let me = this;
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
      this.scenesService.addImage(this.selectedFile,this.sceneNumber,`${form.value.imagename}`)
    }
    //this.scenesService.addScene(,`${form.value.imagename}`);
    this.dialogRef.close();
  }

}
