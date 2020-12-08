import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }, { path: 'publication', loadChildren: () => import('./publication/publication.module').then(m => m.PublicationModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
