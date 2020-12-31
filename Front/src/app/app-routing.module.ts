import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'publication', loadChildren: () => import('./publication/publication.module').then(m => m.PublicationModule) },
  { path: 'profil-utilisateur', loadChildren: () => import('./current-user/current-user.module').then(m => m.CurrentUserModule) },
  { path: 'not-found', loadChildren: () => import('./four-oh-four/four-oh-four.module').then(m => m.FourOhFourModule) },
  { path: '**', loadChildren: () => import('./four-oh-four/four-oh-four.module').then(m => m.FourOhFourModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
