import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminSpaceComponent } from './space/admin-space.component';

const routes: Routes = [{ path: '', component: AdminSpaceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSpaceRoutingModule { }
