import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { DeviceMotion } from '@ionic-native/device-motion/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Directive({
  selector: '[appBubbleLevel]'
})
export class BubbleLevelDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, deviceMotion: DeviceMotion, private screenOrientation: ScreenOrientation) {  
    deviceMotion.watchAcceleration({frequency: 150}).subscribe(response => {
      if(response.z > 6){
        renderer.setStyle(el.nativeElement, 'transform', `translate(${response.x * 40}px,${response.y*-40}px)`);
        if(Math.abs(response.x * 40) + Math.abs(response.y * 40) > 190){
          renderer.setStyle(el.nativeElement,'display','none');
        }else {
          renderer.setStyle(el.nativeElement,'display','initial');
        }
        return;
      }
      renderer.setStyle(el.nativeElement,'display','initial');
      if(screenOrientation.type=='landscape-primary'){
        renderer.setStyle(el.nativeElement, 'transform', `translateX(${response[this.currentOrientation].toFixed(3) * -40}px)`);
        return;
      }
      renderer.setStyle(el.nativeElement, 'transform', `translateX(${response[this.currentOrientation].toFixed(3) * 40}px)`);
    });
    screenOrientation.onChange().subscribe(response => {
      if(screenOrientation.type.indexOf('portrait')){
        this.currentOrientation = 'y';
      }
      if(screenOrientation.type.indexOf('landscape')){
        this.currentOrientation = 'x';
      }
    })
  }
  currentOrientation:string = 'x';
}
