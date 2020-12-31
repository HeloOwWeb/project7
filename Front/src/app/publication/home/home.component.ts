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

  onActionPost(actionButton: string, id: string) {
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
    dialogConfig.data = { action : actionButton, idPost : id };
    //Insertion component dans popup
    this.dialog.open(EditPostComponent, dialogConfig);
//AFTER CLOSE
    const dialogRef = this.dialog.open(EditPostComponent, dialogConfig);
    dialogRef.afterClosed()
    .subscribe( () => { this.allPost(); this.dialog.closeAll(); });
  }

  allPost() {
    this.tabPublications$ = this.publicationService.getAllPosts()
        .pipe( map (
          datas => {
            console.log(datas);
            const tab = [];
            this.responsePublications = datas.publications;
            for(let i=0; i <this.responsePublications.length; i++){
              tab.push(this.responsePublications[i]);
            }
            return tab;
        }));
  }

  delete(id: string){
    this.publicationService.deletePost(id)
    .subscribe((info) => {
      console.log(info);
      this.allPost();
    })
  }
}

