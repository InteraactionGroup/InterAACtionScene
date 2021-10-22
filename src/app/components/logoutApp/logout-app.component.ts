import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-logout-app',
  templateUrl: './logout-app.component.html',
  styleUrls: ['./logout-app.component.css']
})
export class LogoutAppComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutAppComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
