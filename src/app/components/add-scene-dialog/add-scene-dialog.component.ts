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
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log('ATTANTION');
    reader.onload = () => {
      console.log('INTO LOAD');
      this.selectedFile = reader.result;
      if (this.nameInput.nativeElement.value === '') {
        let type = '.' + file.type.replace('image/', '');
        let name = file.name.replace(type, '');
        console.log(name);
        this.nameInput.nativeElement.value = name;
      } else {
        console.log('cest pas passé');
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
