import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FourOhFourRoutingModule } from './four-oh-four-routing.module';
import { FourOhFourComponent } from './FohF/four-oh-four.component';


@NgModule({
  declarations: [FourOhFourComponent],
  imports: [
    CommonModule,
    FourOhFourRoutingModule
  ]
})
export class FourOhFourModule { }
