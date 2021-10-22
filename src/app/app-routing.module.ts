import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component'
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SettingsComponent} from "./components/settings/settings.component";


const routes: Routes = [
  { path:'en', redirectTo: 'en/dashboard', pathMatch: 'full' },
  { path:'fr', redirectTo: 'fr/dashboard', pathMatch: 'full' },
  { path: '', redirectTo: 'fr/dashboard', pathMatch: 'full' },
  { path: 'fr/dashboard', component: MenubarComponent },
  { path: 'fr/settings', component: SettingsComponent },
  { path: 'en/dashboard', component: MenubarComponent },
  { path: 'en/settings', component: SettingsComponent }
];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
