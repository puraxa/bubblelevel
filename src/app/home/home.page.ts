import { Component } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private deviceMotion: DeviceMotion, private platform: Platform, public screenOrientation: ScreenOrientation) {
    platform.ready().then(()=> {
      deviceMotion.watchAcceleration({frequency:250}).subscribe(response => {
        this.x = Math.abs(Math.round(Math.atan2(response.y, response.z) * 57.3));
        this.y = Math.abs(Math.round(Math.atan2((-response.x), Math.sqrt(response.y*response.y + response.z*response.z))*57.3));
        if(response.z > 6 && screenOrientation.type.indexOf('landscape')){
          this.flat = true;
          return;
        }
        this.flat = false;
      });
    })
  }
  flat:boolean;
  x:number = 0;
  y:number = 0;
}
