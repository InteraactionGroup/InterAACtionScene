import { Component, OnInit } from '@angular/core';
import {ScenesService} from '../../services/scenes.service';
import {LanguageService} from '../../services/language.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogTutorialComponent} from '../dialog-tutorial/dialog-tutorial.component';
import {Scene} from '../../types';
import {JsonValidatorService} from '../../services/json-validator.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-default-standard-scene',
  templateUrl: './default-standard-scene.component.html',
  styleUrls: ['./default-standard-scene.component.css']
})
export class DefaultStandardSceneComponent implements OnInit {

  constructor(public scenesService: ScenesService,
              public languageService: LanguageService,
              public dialog: MatDialog,
              private jsonValidatorService: JsonValidatorService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.delay(50).then(r => {
      if (this.scenesService.SCENES.length === 0){
        this.defaultScene();
        this.openDialog();
      }
    });
  }

  public getJSON(): Observable<any> {
    return this.http.get<any>("/assets/share/farm.scene");
  }

  defaultScene(){
    this.getJSON().subscribe(data => {
      const scenes = data;
      if (scenes as Array<Scene>) {
        this.scenesService.SCENES = scenes;
        this.scenesService.updateScenes();
      }
    });
  }

  openDialog(): void{
    this.dialog.open(DialogTutorialComponent, {
      height: '75%',
      width: '75%'
    });
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
