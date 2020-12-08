import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './feature/profile.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatSnackBarModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
