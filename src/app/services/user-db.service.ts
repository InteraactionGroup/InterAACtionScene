import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDBService {

  usersList: string[] = [];
  currentUser: string = '1';

  constructor() {
  }

  addUser(name: string){
    this.usersList.push(name);
  }
}
