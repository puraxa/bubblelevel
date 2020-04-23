import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AnglesService } from '../angles.service';

@Directive({
  selector: '[appPhoneanim]'
})
export class PhoneanimDirective {

  constructor(private angles: AnglesService, private el: ElementRef, private render: Renderer2) {
    angles.motion.watchAcceleration({frequency:250}).subscribe(() => {
      this.corners = this.checkCorners(angles.ori, angles[angles.ori]);
      render.setStyle(el.nativeElement, 'transform', `rotate(${angles[angles.ori]}deg)`);
      render.setStyle(el.nativeElement, 'transform-origin', this.corners);
    })
  }
  checkCorners = (orientation: string, angle: number):string => {
    if(orientation === 'x'){
      return angle > 0 ? 'bottom right' : 'bottom left';
    }
    if(orientation === 'y'){
      return angle > 0 ? 'bottom right' : 'top right';
    }
  }
  corners:string;
}
