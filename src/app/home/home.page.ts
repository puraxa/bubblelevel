import { Component } from '@angular/core';
import { AnglesService } from '../angles.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public angles: AnglesService
    ) {
      
    }
}
