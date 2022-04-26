import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component'
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SettingsComponent} from "./components/settings/settings.component";
import {LoadingUserComponent} from './components/loading-user/loading-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: MenubarComponent },
  { path: 'settings', component: SettingsComponent },
  { path: ':lg/dashboard', component: MenubarComponent },
  { path: ':lg/settings', component: SettingsComponent },
  { path: ':lg/connect/:id', component: LoadingUserComponent }
];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
