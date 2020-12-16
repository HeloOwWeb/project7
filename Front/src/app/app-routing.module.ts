import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'publication', loadChildren: () => import('./publication/publication.module').then(m => m.PublicationModule) },
  { path: 'profil-utilisateur', loadChildren: () => import('./current-user/current-user.module').then(m => m.CurrentUserModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
