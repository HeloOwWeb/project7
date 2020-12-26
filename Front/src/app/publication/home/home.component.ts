import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publication } from 'src/app/models/Publication.model';
import { Pagination } from '../../models/PaginationPosts.model';
import { PublicationService } from '../../services/publication.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "75%";

  isLoad: boolean = false;
  tabPublications$!: Observable<any>;
  responsePublications: any;
  //_____EMOTIONS_____________________
  responseEmotions: any;
  totalLike: number= 0;

  constructor(private dialog: MatDialog,
    public breakpointObserver: BreakpointObserver,
    private publicationService : PublicationService) { }

  ngOnInit(): void {
    this.dialogWidthHeight();
    this.allPost();
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

  onCreateUser() {
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
    //Insertion component dans popup
    this.dialog.open(EditPostComponent, dialogConfig);
  }

  allPost() {
    this.tabPublications$ = this.publicationService.getAllPosts()
        .pipe( map (
          datas => {
            const tab = [];
            let value = 0;
            this.responsePublications = datas.publications;
          for(let i=0; i <this.responsePublications.length; i++){
            tab.push(this.responsePublications[i]);

            this.responseEmotions =this.responsePublications[i].EmotionsPublication;
            for ( let j=0; j< this.responseEmotions.length; j++){
              value += this.responseEmotions[j].isLike;
              this.totalLike = value;
            }
          }
          console.log(tab);
          console.log(this.responseEmotions);
          console.log(this.totalLike);
          return tab;
        }));
  }

  onLike(idPost : number){
    console.log(idPost);
    const etatLike = { "like" : +1 };
    this.publicationService.sendLike(etatLike, idPost)
    .subscribe( response => {
      console.log(response);
    });
  }

  onDislike(idPost : number){
    console.log(idPost);
    const etatLike = { "like" : -1 };
    this.publicationService.sendLike(etatLike, idPost)
    .subscribe( response => {
      console.log(response);
    });
  }
}

