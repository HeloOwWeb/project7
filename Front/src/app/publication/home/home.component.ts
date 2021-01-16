import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { PublicationService } from '../../services/publication.service';
import { EditPostComponent } from '../edit-post/edit-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  message: string= '';
  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "70%";

  isLoad: boolean = false;
  tabPublications$!: Observable<any>;
  responsePublications: any;
  //Informations Pagination API
  currentPage: number = 0;
  maxPages: number = 0;
  pagination: boolean = false;
  //Données Pagination Front
  page: number = 1;

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private notification: MatSnackBar,
    private dialog: MatDialog,
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
      this.widthDialogu = "35%";
      this.heightDialogu = "75%";
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
    .subscribe( () => { this.currentPage = 0; this.allPost(); this.dialog.closeAll(); });
  }

  allPost() {
    this.tabPublications$ = this.publicationService.getAllPosts(this.currentPage)
        .pipe(
          takeUntil(this.ngUnsubscribe$),
          map ( datas => {
            const tab = [];
            this.responsePublications = datas.publications;
            for(let i=0; i <this.responsePublications.length; i++){
              tab.push(this.responsePublications[i]);
            }
            this.currentPage = datas.currentPage;
            this.maxPages = datas.totalPages;
            this.page = this.currentPage +1;
            this.isLoad = true;
            if(tab.length == 0){
              this.pagination = false;
              // trouver une solution ici
            } else {
              this.pagination = true;
            }
            return tab;
        }));
  }

  reloadPosts(action : string){
    if(action === 'next'){
      if(this.currentPage < this.maxPages ){
        this.currentPage ++;
      } else {
        this.currentPage = 0;
      }
    } else if (action === 'previous'){
      if(this.currentPage > 0 ){
        this.currentPage --;
      } else if(this.currentPage === 0){
        this.currentPage = this.maxPages;
      }
    }
    this.allPost();
  }

  delete(id: string){
    this.publicationService.deletePost(id)
    .pipe(takeUntil(this.ngUnsubscribe$))
    .subscribe((info) => {
      this.message = info.toString();
            this.notification.open(this.message, undefined, {
              duration: 4 * 1000
            });
      this.allPost();
    })
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}

