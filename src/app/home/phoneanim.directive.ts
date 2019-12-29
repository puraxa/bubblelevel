import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { AnglesService } from '../angles.service';

@Directive({
  selector: '[appPhoneanim]'
})
export class PhoneanimDirective {

  constructor(private angles: AnglesService, private el: ElementRef, private render: Renderer2) {
    angles.motion.watchAcceleration({frequency:250}).subscribe(() => {
      render.setStyle(el.nativeElement, 'transform', `rotate(${angles[angles.ori]}deg)`);
    })
  }

}
