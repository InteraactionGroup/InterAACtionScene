import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-add-scene-dialog',
  templateUrl: './add-scene-dialog.component.html',
  styleUrls: ['./add-scene-dialog.component.css']
})
export class AddSceneDialogComponent implements OnInit {

  form: FormGroup;
  @ViewChild('name') nameInput: ElementRef<HTMLInputElement>;
  fileName = "";
  selectedFile = null;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddSceneDialogComponent>,
    public languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      scenename: '',
      firstimagename: ''
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
      if (this.nameInput.nativeElement.value === '') {
        this.nameInput.nativeElement.value = file.name;
        this.fileName = file.name;
      }
    };

    reader.onerror = (error) => {
      console.log('INTO ERROR');
      console.log('Error: ', error);
    };

  }

  submit(form) {
    if (this.selectedFile != null) {
      this.scenesService.addScene(this.selectedFile, `${form.value.scenename}`, `${form.value.firstimagename}`);
    }
    // this.scenesService.addScene(,`${form.value.scenename}`);
    this.dialogRef.close();
  }

}
