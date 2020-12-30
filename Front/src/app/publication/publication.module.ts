import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//Routing
import { PublicationRoutingModule } from './publication-routing.module';
//Components
import { HomeComponent } from './home/home.component';
import { EditPostComponent } from './edit-post/edit-post.component';
//Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { EmotionComponent } from './emotion/emotion.component';
import { CommentComponent } from './comment/comment.component';
import { EditCommentComponent } from './edit-comment/edit-comment.component';

@NgModule({
  declarations: [HomeComponent, EditPostComponent, EmotionComponent, CommentComponent, EditCommentComponent],
  imports: [
    CommonModule,
    PublicationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  exports: [
    HomeComponent
  ]
})
export class PublicationModule { }
