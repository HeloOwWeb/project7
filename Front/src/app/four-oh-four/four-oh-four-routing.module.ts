import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FourOhFourComponent } from './FohF/four-oh-four.component';

const routes: Routes = [{ path: '', component: FourOhFourComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FourOhFourRoutingModule { }
