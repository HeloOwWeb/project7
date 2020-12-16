import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentUserComponent } from './current-user/current-user.component';

const routes: Routes = [{ path: '', component: CurrentUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentUserRoutingModule { }
