import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';
import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';
import { map, takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { KeyService } from '../../services/key.service';

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

  constructor(private formBuilder: FormBuilder, private gifService: GiphyService, private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.initForm();
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
    this.selectGifOK = false;
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

  onSubmit() {
    //Récupération valeur du champs Texte
    const formValue = this.publicationFormCreate.value;
    const text = formValue['textPost'];
//----------------------------------------------------
    //Création Publiation
    //Agrément du FormData
    this.data.append('textPost', text);
    this.data.append('gifPost', this.urlGIF);

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
  //--------------------------------------------------------------------------FIN PUBLICATION
}
