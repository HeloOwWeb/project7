import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Publication } from '../../models/Publication.model';
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

  loadPublications: Publication[] = [];

  constructor(private dialog: MatDialog, public breakpointObserver: BreakpointObserver, private publicationService : PublicationService) { }

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
    this.publicationService.getAllPosts()
      .subscribe(posts => {
        this.loadPublications = posts;
      });   
  }

}
