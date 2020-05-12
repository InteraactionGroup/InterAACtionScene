import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenubarComponent } from './menubar/menubar.component';
import { SceneDisplayComponent } from './scene-display/scene-display.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AddSceneDialogComponent } from './add-scene-dialog/add-scene-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddImageDialogComponent } from './add-image-dialog/add-image-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageScenesComponent } from './manage-scenes/manage-scenes.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { RenameDialogComponent } from './rename-dialog/rename-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    SceneDisplayComponent,
    CanvasComponent,
    AddSceneDialogComponent,
    AddImageDialogComponent,
    ManageScenesComponent,
    ConfirmationDialogComponent,
    RenameDialogComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ScrollingModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AddSceneDialogComponent,
    AddImageDialogComponent,
  ]

})
export class AppModule { }
