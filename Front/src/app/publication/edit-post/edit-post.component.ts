import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GiphyService } from '../../services/giphy.service';
import { Publication } from '../../models/Publication.model';
import { PublicationService } from '../../services/publication.service';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})

export class EditPostComponent implements OnInit {

  //------------Formulaire
  publicationFormCreate!: FormGroup;
  errorMsg!: string;
  token: string = "blouBlouBlou";

  //------------UPLOAD
  loadingUpload: boolean = false;
  file!: File;
  filePreview!: string;
  formData = new FormData();
  uploadOK: boolean = false;
  //------------GIPHY
  //récupération du texte Giphy
  textSearchGif: string = "Soleil ou Joie";
  //réponse Giphy
  reponseGiphy: any;
  tabGif$!: Observable<any[]>;
  //sélectionner le gif
  selectGifOK = false;
  urlGIF!: string;

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
    //ré-initialiser le formData
    if (this.filePreview) {
      this.formData.delete('file');
      this.uploadOK = false;
    }    
    this.selectGifOK = false;
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
  }
  //-------------------------------------------------------------------------FIN GIPHY
  //--------------------------------------------------------------------------UPLOAD IMG/PNG/GIF
  fileSelect(event: any) {
    //ré-initialiser Gif!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (this.urlGIF) {
      this.selectGifOK = false;
      /*this.tabGif$ = ;*/
    }    
    this.file = event.target.files[0];
    //Ajout du fichier dans FormData
    this.formData.append('file', this.file, this.file.name);
    const reader = new FileReader();
    reader.onload = () => {
      this.filePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    this.uploadOK = true;
  }
  //--------------------------------------------------------------------------PUBLICATION
  //--------------------------------------------------------------------------FIN PUBLICATION
  //ENVOI de la publication en POST
  // gifPost = urlGIF (null par défaut)
  // imagePost = objet (null par défaut)
  initForm() {
    this.publicationFormCreate = this.formBuilder.group({
      textPost: ['']
    });
  }

  onSubmit() {
    const formValue = this.publicationFormCreate.value;
    const objectTextPost = new Publication(
      formValue['textPost']
    );
    const objectPost = {
      'token': this.token,
      'textPost': objectTextPost.textPost,
      'gifPost': this.urlGIF,
      'imagePost': this.formData
    };
    this.publicationService.create(objectPost)
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

}
