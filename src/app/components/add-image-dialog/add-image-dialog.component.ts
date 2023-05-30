import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ScenesService} from '../../services/scenes.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {

  form: FormGroup;
  @ViewChild('name') nameInput: ElementRef<HTMLInputElement>;
  selectedFile = null;
  @Input() sceneNumber: number;

  constructor(
    private scenesService: ScenesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddImageDialogComponent>,
    public languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      imagename: ''
    });
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedFile = reader.result;
      if (this.nameInput.nativeElement.value === '') {
        let nameSplit = file.name.split('.');
        for (let i = 0; i < nameSplit.length - 1; i++) {
          this.nameInput.nativeElement.value += nameSplit[i];
        }
      }
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };

  }

  submit(form) {
    if (this.selectedFile != null) {
      this.scenesService.addImage(this.selectedFile, this.sceneNumber, `${form.value.imagename}`);
    }
    // this.scenesService.addScene(,`${form.value.imagename}`);
    this.dialogRef.close();
  }

}
