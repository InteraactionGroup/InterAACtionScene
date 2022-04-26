import { Component, OnInit } from '@angular/core';
import {LanguageService} from "../../services/language.service";

@Component({
  selector: 'app-dialog-tutorial',
  templateUrl: './dialog-tutorial.component.html',
  styleUrls: ['./dialog-tutorial.component.css']
})
export class DialogTutorialComponent implements OnInit {

  displayIFrame: boolean = false;

  constructor(public languageService: LanguageService) { }

  ngOnInit(): void {
  }

  displayIframe() {
    this.displayIFrame = !this.displayIFrame;
  }
}
