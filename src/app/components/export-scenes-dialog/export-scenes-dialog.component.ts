import { Component, OnInit } from '@angular/core';
import {ScenesService} from "../../services/scenes.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-export-scenes-dialog',
  templateUrl: './export-scenes-dialog.component.html',
  styleUrls: ['./export-scenes-dialog.component.css']
})
export class ExportScenesDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ExportScenesDialogComponent>
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    })
  }

  submit(form) {
    const SCENESjson = JSON.stringify(this.scenesService.getScenes());
    const file = new Blob([SCENESjson], {type: 'text/json'});
    let jsonName = `${form.value.name}`;
    if (window.navigator.msSaveOrOpenBlob) { // IE10+
      window.navigator.msSaveOrOpenBlob(file, jsonName + '.scene');
    } else { // Others
      const a = document.createElement('a');
      const url = URL.createObjectURL(file);
      a.href = url;
      a.download = jsonName + '.scene';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
    this.dialogRef.close();
  }

}
