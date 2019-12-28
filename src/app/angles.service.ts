import { Injectable } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Injectable({
  providedIn: 'root'
})
export class AnglesService {
  constructor(
    private motion: DeviceMotion,
    private platform: Platform,
    private orientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      motion.watchAcceleration({frequency: 250}).subscribe(accel => {
        this.x = this.calculateAngle(accel.x, accel.y);
        this.y = Math.abs(this.x - 90);
        this.z = Math.abs(this.calculateAngle(accel.z, accel.y) - 90);
        this.xz = this.calculateAngle(accel.x, accel.z);
        this.flat = this.checkIfFlat(this.z, orientation.type);
      })
    });
}
  x:number = 0; 
  y:number = 0;
  z:number = 0;
  xz:number = 0;
  flat:boolean;
  calculateAngle = (x:number, y:number):number => {
    return Math.abs(Math.round(Math.atan2(x,y)*57.3));
  }
  checkIfFlat = (angle:number,orientation:string):boolean => {
    return angle < 50 && orientation.indexOf('landscape') ? true : false;
  }
}
