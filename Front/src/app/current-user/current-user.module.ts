import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ConfirmDeleteAccountComponent } from './confirm-delete-account/confirm-delete-account.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [ProfilComponent, CurrentUserComponent, EditProfilComponent, PublicationCurrentComponent, ConfirmDeleteAccountComponent],
  imports: [
    CommonModule,
    CurrentUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule,
    FontAwesomeModule
  ],
  exports: [
    CurrentUserComponent
  ]
})
export class CurrentUserModule { }
