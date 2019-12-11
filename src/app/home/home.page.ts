import { Component } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private deviceMotion: DeviceMotion, private screenOri: ScreenOrientation) {
    deviceMotion.watchAcceleration({frequency:250}).subscribe(response => {
      if(response.z > 6){
        this.flat = true;
        return;
      }
      this.flat = false;
    });
  }
  flat:boolean;
}
