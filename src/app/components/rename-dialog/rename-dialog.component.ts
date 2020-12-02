import {Component, Input, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';

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
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: '',
    })
  }

  submit(form) {
    if (this.imageSelected) {
      this.scenesService.renameImage(this.selectedScene, this.selectedImage, `${form.value.name}`)
    } else {
      this.scenesService.renameScene(this.selectedScene, `${form.value.name}`)
    }
    this.dialogRef.close();
  }

}
