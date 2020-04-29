import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MenubarComponent } from './menubar/menubar.component';
import { SceneDisplayComponent } from './scene-display/scene-display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CanvasComponent } from './canvas/canvas.component';
import { AddSceneDialogComponent } from './add-scene-dialog/add-scene-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { AddImageDialogComponent } from './add-image-dialog/add-image-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    SceneDisplayComponent,
    CanvasComponent,
    AddSceneDialogComponent,
    AddImageDialogComponent,
    BrowserAnimationsModule
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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddSceneDialogComponent]

})
export class AppModule { }
