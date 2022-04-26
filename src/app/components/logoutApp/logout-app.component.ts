import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {saveAs as importedSaveAs} from 'file-saver';

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

  putYes(){
    const blob = new Blob([""], {type: 'text/txt'});
    importedSaveAs(blob, 'close161918.txt');
  }
}
