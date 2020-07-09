import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder,ReactiveFormsModule  } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ScenesService } from '../scenes.service';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.css']
})
export class RenameDialogComponent implements OnInit {

  @Input() selectedScene: number;
  @Input() selectedImage: number;
  @Input() imageSelected: boolean;
  form: FormGroup;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<RenameDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
    })
  }

  submit(form) {
    if (this.imageSelected) {
      this.scenesService.renameImage(this.selectedScene,this.selectedImage,`${form.value.name}`)
    } else {
      this.scenesService.renameScene(this.selectedScene,`${form.value.name}`)
    }
    this.dialogRef.close();
  }

}
