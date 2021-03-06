import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { BubbleLevelDirective } from './bubble-level.directive';
import { PhoneanimDirective } from './phoneanim.directive';
import { AbsolutePipe } from './absolute.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, BubbleLevelDirective, PhoneanimDirective, AbsolutePipe]
})
export class HomePageModule {}
