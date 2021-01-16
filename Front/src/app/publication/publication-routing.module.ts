import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardsService } from '../services/guards.service';

import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [GuardsService] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
