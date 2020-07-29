import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  selectedMode: String = 'play';

  constructor() { }
}
