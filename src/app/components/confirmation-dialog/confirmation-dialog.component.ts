import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit{

  public messageTab:string[] = [];

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              public languageService: LanguageService,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  ngOnInit(): void {
    this.messageTab = this.message.toString().split(',');
    console.log(this.messageTab);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
