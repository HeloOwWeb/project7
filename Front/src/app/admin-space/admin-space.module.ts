import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminSpaceRoutingModule } from './admin-space-routing.module';
import { AdminSpaceComponent } from './space/admin-space.component';

import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AdminSpaceComponent],
  imports: [
    CommonModule,
    AdminSpaceRoutingModule,
    MatInputModule,
    MatTableModule,
    MatIconModule
  ],
  exports: [
    AdminSpaceComponent
  ]
})
export class AdminSpaceModule { }
