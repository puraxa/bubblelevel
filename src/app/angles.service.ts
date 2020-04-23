import { Injectable } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { Platform } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';


@Injectable({
  providedIn: 'root'
})
export class AnglesService {
  constructor(
    public motion: DeviceMotion,
    private platform: Platform,
    public orientation: ScreenOrientation
  ) {
    platform.ready().then(() => {
      motion.watchAcceleration({ frequency: 250 }).subscribe(accel => {
        this.x = this.calculateAngle(accel.x, accel.y);
        this.y = this.calculateAngle(accel.y, accel.x);
        this.z = this.calculateAngle(accel.z, accel.y);
        this.xz = this.calculateAngle(accel.x, accel.z);
        this.flat = this.checkIfFlat(this.z, orientation.type);
        this.ori = this.checkOrientation(orientation);
      })
    });
  }
  x: number = 0;
  y: number = 0;
  z: number = 0;
  xz: number = 0;
  flat: boolean;
  ori: string = 'x';
  calculateAngle = (x: number, y: number): number => {
    return Math.round(Math.atan2(x, y) * 57.3);
  }
  checkIfFlat = (angle: number, orientation: string): boolean => {
    return angle > 50 && orientation.indexOf('landscape') ? true : false;
  }
  checkOrientation = (ori: ScreenOrientation): string => {
    if (ori.type.indexOf('portrait') == 0) {
      return 'x';
    }
    if (ori.type.indexOf('landscape') == 0) {
      return 'y';
    }
    return 'z';
  }
}
