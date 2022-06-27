import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              public languageService: LanguageService,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  public messageTab:string[] = []

  ngOnInit(): void {
    this.messageTab = this.message.split(' ');
    console.log('this.messageTab',this.messageTab);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
