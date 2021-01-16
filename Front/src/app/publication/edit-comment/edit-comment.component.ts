import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { CommentsService } from 'src/app/services/comments.service';
import { GiphyService } from 'src/app/services/giphy.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit, OnDestroy {
  idPost!: string;
  //------------Formulaire
  commentFormCreate!: FormGroup;
  errorMsg!: string;
  //------------STICKERS
  //récupération du texte Giphy
  textSearchStickers: string = "Sourire ou Panda";
  //réponse Giphy
  reponseGiphy: any;
  tabSticker$!: Observable<any[]>;
  responseStickerOK = false;
  //sélectionner le Sticker
  selectStickerOK = false;
  urlSTICKER: string ='';
  //Modify var
  autocollantModify: string = '';
  stickerModifyOK: boolean = false;
  textModify: string = '';
  textPresent: boolean = false;
  modify: boolean = false;
  // Variables
  tabComments$!: Observable<any>;
  reponseComment!: any;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialogRef: MatDialogRef<CommentComponent>,
    private formBuilder: FormBuilder,
    private giphyService : GiphyService,
    private commentService: CommentsService,
    @Inject(MAT_DIALOG_DATA) public dataAction: { action: string, idPublication : string, idComment: string}
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.affichageDesInfos();
  }
 //-------------------------------------------------------------------------GIPHY
  //Evenement change text Giphy
  change(e: any) {
    this.textSearchStickers = e.target.value;
  }

  //Récupération des datas API GIPHY
  searchSticker() {
    //ré-initialiser
    this.stickerModifyOK = false;
    this.selectStickerOK = false;
    this.responseStickerOK = true;
    //RECHERCHE ET RECUP Sticker
    this.tabSticker$ =
      this.giphyService.searchStickers(this.textSearchStickers)
      .pipe(
        takeUntil(this.ngUnsubscribe$),
        tap( dataB => { console.log(dataB); }),
        map(info => {
            const tab = [];
            console.log(info);
            this.reponseGiphy = info.data;
            for (let i = 0; i < this.reponseGiphy.length; i++) {
              tab.push(this.reponseGiphy[i].images.original.url);
            }
            return tab;
          }
        )
      )
  }

  selectStickerID(valeurID: string) {
    this.urlSTICKER = valeurID;
    this.selectStickerOK = true;
    this.responseStickerOK = false;
  }
  //-------------------------------------------------------------------------FIN GIPHY
//--------------------------------------------------------------------------COMMENTAIRE
  //ENVOI du commentaire en POST
  initForm() {
    this.commentFormCreate = this.formBuilder.group({
      textComment: ['']
    });
  }

    //______________________________________________________________________________
  //______________________________________________________________________________
  //----------------------------------------------------MODIFICATION D'UN COMMENTAIRE
  affichageDesInfos(){
    console.log(this.dataAction);
    if(this.dataAction.action === 'modify'){
      this.modify = true;
      this.commentService.getOneComment(this.dataAction.idComment)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(info => {
          if(info.autocollantComment){
            this.urlSTICKER = info.autocollantComment;
            this.stickerModifyOK= true;
          }
          if (info.textComment){
            this.textPresent = true;
            this.textModify = info.textComment;
          }
      });
    }
  }

  onSubmit() {
//----------------------------------------------------CREATION D'UN COMMENTAIRE
    if(this.dataAction.action === 'create'){
      //Récupération valeur du champs Texte
      const formValue = this.commentFormCreate.value;
      const text = formValue['textComment'];
  //----------------------------------------------------
      //Création Commentaire
      //Création de l'objet JSON Commentaire
      const objetComment = {
        'textComment': text,
        'autocollantComment' : this.urlSTICKER
      }
      this.idPost = this.dataAction.idPublication;
      //Envoi du commentaire
      this.commentService.createComment(this.idPost, objetComment)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe(
          response => {
            console.log(response);
            //this.message = true;
            //this.alertMessage();
          },
          error => {
            //this.message = false;
            console.log("Une erreur est survenue: " + error.message);
          }
        );
    }

    //----------------------------------------------------MODIFIER D'UN COMMENTAIRE
    if(this.dataAction.action === 'modify'){
      //Récupération valeur du champs Texte
      //Si aucune modification du texte
      let text;
      if( this.textPresent && !this.commentFormCreate.value['textComment']){
        text = this.textModify;
      } else {
        const formValue = this.commentFormCreate.value;
        text = formValue['textComment'];
      }

      const idCommentaire = this.dataAction.idComment;
      const objetComment= {
        'textComment': text,
        'autocollantComment': this.urlSTICKER
      };

      this.commentService.modifyComment(idCommentaire, objetComment)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe( info => { console.log(info); });
    }
    this.dialogRef.close();
  }
  //--------------------------------------------------------------------------FIN COMMENTAIRE

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
