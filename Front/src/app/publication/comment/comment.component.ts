import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CommentsService } from 'src/app/services/comments.service';
import { EditCommentComponent } from '../edit-comment/edit-comment.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "75%";
  // Récupération de l'ID publication
  @Input()idPost!: string;
  // Variables
  tabComments$!: Observable<any>;
  reponseComment!: any;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

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
      this.widthDialogu = "35%";
      this.heightDialogu = "75%";
    }
  }

  onActionPost(action: string, idComment: string) {
    //Configuration de la fenetre modal
    const dialogConfig = new MatDialogConfig();
    //Paramétrage fermeture - click en dehors non accepte
    dialogConfig.disableClose = true;
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
//AFTER CLOSE
    const dialogRef = this.dialog.open(EditCommentComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe( () => { this.allComments(this.idPost); this.dialog.closeAll(); });
  }

  allComments(id: string){
    this.tabComments$ = this.commentService.getAllComments(id)
    .pipe(
      takeUntil(this.ngUnsubscribe$),
      map (datas => {
        const tab = [];
        this.reponseComment= datas.comments;
        for(let i=0; i<this.reponseComment.length ; i++){
          tab.push(this.reponseComment[i]);
        }
        return tab;
    }));
  }

  deleteComment(id: string){
    this.commentService.deleteComment(id)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe( info => { this.allComments(this.idPost); });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
