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
      nameScene: this.scenesService.SCENES[this.selectedScene].name,
      nameImage: this.scenesService.SCENES[this.selectedScene].images[this.selectedImage].name
    });
  }

  submit(form) {
    if (this.imageSelected && form.value.nameImage !== '') {
      this.scenesService.renameImage(this.selectedScene, this.selectedImage, `${form.value.nameImage}`);
    }
    if (form.value.nameScene !== '') {
      this.scenesService.renameScene(this.selectedScene, `${form.value.nameScene}`);
    }
    this.dialogRef.close();
  }

}
