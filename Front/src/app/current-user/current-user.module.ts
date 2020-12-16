import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentUserRoutingModule } from './current-user-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';

//Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { PublicationCurrentComponent } from './publication-current/publication-current.component';


@NgModule({
  declarations: [ProfilComponent, CurrentUserComponent, EditProfilComponent, PublicationCurrentComponent],
  imports: [
    CommonModule,
    CurrentUserRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule
  ],
  exports: [
    CurrentUserComponent
  ]
})
export class CurrentUserModule { }
