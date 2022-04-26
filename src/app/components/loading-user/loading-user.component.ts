import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ScenesService} from '../../services/scenes.service';
import {UserDBService} from '../../services/user-db.service';
import {SettingsService} from '../../services/settings.service';

@Component({
  selector: 'app-loading-user',
  templateUrl: './loading-user.component.html',
  styleUrls: ['./loading-user.component.css']
})
export class LoadingUserComponent implements OnInit {

  username: string = "";

  constructor(private route: Router,
              private scenesService: ScenesService,
              private userDBService: UserDBService,
              public routes: ActivatedRoute,
              public settingsService: SettingsService) {

  }

  ngOnInit(): void {
    this.settingsService.AFSR = true;
    //this.username = location.href.substring(32);
    this.username = String(this.routes.snapshot.paramMap.get('id'));
    this.userDBService.currentUser = this.username;
    localStorage.setItem('logged', this.userDBService.currentUser);
    this.scenesService.loadUserOfUsersList(this.username);
    if(String(this.routes.snapshot.paramMap.get('lg')) === 'fr'){
      setTimeout(() => this.route.navigate(['fr/dashboard']),100);
    }
    else{
      setTimeout(() => this.route.navigate(['en/dashboard']),100);
    }
  }

}
