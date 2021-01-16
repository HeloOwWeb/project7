import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsOfUseComponent } from './auth/terms-of-use/terms-of-use.component';
import { GuardsService } from './services/guards.service';

const routes: Routes = [
  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'auth/CU', component: TermsOfUseComponent },
  { path: 'publication', canActivate:[GuardsService], loadChildren: () => import('./publication/publication.module').then(m => m.PublicationModule) },
  { path: 'profil-utilisateur', canActivate:[GuardsService], loadChildren: () => import('./current-user/current-user.module').then(m => m.CurrentUserModule) },
  { path: 'espace-admin', canActivate:[GuardsService], loadChildren: () => import('./admin-space/admin-space.module').then(m => m.AdminSpaceModule) },
  { path: 'not-found', loadChildren: () => import('./four-oh-four/four-oh-four.module').then(m => m.FourOhFourModule) },
  { path: '**', loadChildren: () => import('./four-oh-four/four-oh-four.module').then(m => m.FourOhFourModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
