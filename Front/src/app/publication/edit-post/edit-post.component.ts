import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';
import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';
import { map, takeUntil } from 'rxjs/operators';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {
  //------------Formulaire
  publicationFormCreate!: FormGroup;
  errorMsg!: string;
  data = new FormData();
  //------------UPLOAD
  loadingUpload: boolean = false;
  file!: File;
  filePreview!: string;
  uploadOK: boolean = false;
  //------------GIPHY
  //récupération du texte Giphy
  textSearchGif: string = "Soleil ou Joie";
  //réponse Giphy
  reponseGiphy: any;
  tabGif$!: Observable<any[]>;
  responseGifOK = false;
  //sélectionner le gif
  selectGifOK = false;
  urlGIF: string ='';
  //------------MODIFIER
  //Affichage des informations de la publication
  modifyOK: boolean = false;
  imageOK: boolean = false;
  urlImage: string = '';
  textArea: string ='';
  textPresent: boolean = false;

  constructor(private formBuilder: FormBuilder, private gifService: GiphyService, private publicationService: PublicationService,
    @Inject(MAT_DIALOG_DATA) public dataAction: { action : string, idPost : string }) { }

  ngOnInit(): void {
    this.initForm();
    this.affichageDesInfos();
  }

  //-------------------------------------------------------------------------GIPHY
  //Evenement change text Giphy
  change(e: any) {
    this.textSearchGif = e.target.value;
  }

  //Récupération des datas API GIPHY
  searchGiphy() {
    //ré-initialiser le file
    if (this.filePreview) {
      this.uploadOK = false;
    }
    this.imageOK = false;
    this.selectGifOK = false;
//    this.modifyOK = false;
    this.responseGifOK = true;
    //RECHERCHE ET RECUP Gif
    this.tabGif$ =
      this.gifService.searchGiphy(this.textSearchGif)
      .pipe(
        map(
          info => {
            const tab = [];
            this.reponseGiphy = info.data;
            for (let i = 0; i < this.reponseGiphy.length; i++) {
              tab.push(this.reponseGiphy[i].images.original.url);
            }
            return tab;
          }
        )
      )
  }

  selectGifID(valeurID: string) {
    this.urlGIF = valeurID;
    this.selectGifOK = true;
    this.responseGifOK = false;
    //On a sélectionné le Gif donc annule et met à jour le formData Image en vide
    this.data.delete('image');
  }
  //-------------------------------------------------------------------------FIN GIPHY
  //--------------------------------------------------------------------------UPLOAD IMG/PNG/GIF
  fileSelect(event: any) {
    //ré-initialiser Gif
    this.urlGIF = '';
    this.selectGifOK = false;
    this.responseGifOK = false;
    this.textSearchGif = "";
    //Gestion d'upload------------------------------
    this.file = event.target.files[0];
    //Lecteur et ajout de l'objt pour visualisation
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    this.uploadOK = true;
    this.imageOK = false;
    //Ajout du file dans le formData
    this.data.append('image', this.file);
  }
  //--------------------------------------------------------------------------PUBLICATION
  //ENVOI de la publication en POST
  initForm() {
    this.publicationFormCreate = this.formBuilder.group({
      textPost: ['']
    });
  }
  //______________________________________________________________________________
  //______________________________________________________________________________
  //----------------------------------------------------MODIFICATION D'UNE PUBLICATION
  affichageDesInfos(){
    if(this.dataAction.action === 'modify'){
      this.publicationService.getOnePublication(this.dataAction.idPost)
      .subscribe(info => {
        console.log(info);
        this.modifyOK = true;
        if(info.imagePost){
          this.imageOK = true;
          this.urlImage = info.imagePost;
        }
        if (info.gifPost){
          this.selectGifOK = true;
          this.urlGIF = info.gifPost;
        }
        if (info.textPost){
          this.textPresent = true;
          this.textArea = info.textPost;
        }
      });
    }
  }

  onSubmit() {
//----------------------------------------------------CREATION D'UNE PUBLICATION
    if(this.dataAction.action === 'create'){
      //Récupération valeur du champs Texte
      const formValue = this.publicationFormCreate.value;
      this.textArea = formValue['textPost'];
      //----------------------------------------------------
      //Création Publication
      //Agrément du FormData
      this.data.append('textPost', this.textArea);
      this.data.append('gifPost', this.urlGIF);

      console.log(this.data.getAll('textPost'));
      console.log(this.data.getAll('gifPost'));
      console.log(this.data.getAll('image'));

      //Envoi de la publication
      this.publicationService.create(this.data)
        .subscribe(
          response => {
            console.log(response);
            //this.message = true;
            //this.alertMessage();
            //this.dialogRef.close();
          },
          error => {
            //this.message = false;
            console.log("Une erreur est survenue: " + error.message);
          });
    }

//----------------------------------------------------MODIFIER D'UNE PUBLICATION
    if(this.dataAction.action === 'modify'){
      //Récupération valeur du champs Texte
      //Si aucune modification du texte
      if( this.textPresent && !this.publicationFormCreate.value['textPost']){
        this.data.append('textPost', this.textArea);
      } else {
        const formValue = this.publicationFormCreate.value;
        this.textArea = formValue['textPost'];
        this.data.append('textPost', this.textArea);
      }
      //----------------------------------------------------
      this.data.append('gifPost', this.urlGIF);

      console.log(this.data.getAll('textPost'));
      console.log(this.data.getAll('gifPost'));
      console.log(this.data.getAll('image'));

      this.publicationService.modifyPost(this.dataAction.idPost, this.data)
      .subscribe( infos => {
        console.log(infos);
      })
      }

  }
  //--------------------------------------------------------------------------FIN PUBLICATION
}
