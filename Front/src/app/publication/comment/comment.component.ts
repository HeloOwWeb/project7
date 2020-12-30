import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentsService } from 'src/app/services/comments.service';
import { GiphyService } from 'src/app/services/giphy.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "75%";
  // Récupération de l'ID publication
  @Input()idPost!: string;
  // Variables
  tabComments$!: Observable<any>;
  reponseComment!: any;

  constructor(
    private dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private commentService : CommentsService
  ) { }

  ngOnInit(): void {
    this.dialogWidthHeight();
    this.allComments(this.idPost);
  }

  dialogWidthHeight() {
    if (this.breakpointObserver.isMatched('(min-width: 768px && max-width: 1439px)')) {
      this.widthDialogu = "50%";
      this.heightDialogu = "60%";
    } else if (this.breakpointObserver.isMatched('(min-width: 1440px)')) {
      this.widthDialogu = "30%";
      this.heightDialogu = "65%";
    }
  }

  onActionPost(action: string, idComment: string) {
    //Configuration de la fenetre modal
    const dialogConfig = new MatDialogConfig();
    //Paramétrage fermeture - click en dehors accepte
    dialogConfig.disableClose = false;
    // Paramétrage ouvert
    //focus sur le premier champs
    dialogConfig.autoFocus = true;
    //Taille de la popup
    dialogConfig.width = this.widthDialogu;
    dialogConfig.height = this.heightDialogu;
    //Envoi du InputIdPost
    dialogConfig.data = { action: action, idPublication : this.idPost, idComment: idComment };
    //Insertion component dans popup
    this.dialog.open(EditCommentComponent, dialogConfig);
  }

  allComments(id: string){
    this.tabComments$ = this.commentService.getAllComments(id)
    .pipe( map (
      datas => {
        console.log(datas);
        const tab = [];
        this.reponseComment= datas.comments;
        for(let i=0; i<this.reponseComment.length ; i++){
          tab.push(this.reponseComment[i]);
        }
        return tab;
    }));
  }
}