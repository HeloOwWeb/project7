import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FourOhFourRoutingModule } from './four-oh-four-routing.module';
import { FourOhFourComponent } from './FohF/four-oh-four.component';

import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [FourOhFourComponent],
  imports: [
    CommonModule,
    FourOhFourRoutingModule,
    MatButtonModule
  ],
  exports: [
    FourOhFourComponent
  ]
})
export class FourOhFourModule { }
