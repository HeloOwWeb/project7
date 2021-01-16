import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EditProfilComponent } from '../edit-profil/edit-profil.component';
import { Router } from '@angular/router';
import { ConfirmDeleteAccountComponent } from '../confirm-delete-account/confirm-delete-account.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  firstname!: string;
  lastname!: string;
  description: string = "Aucune description pour en ajouter une cliquer sur le bouton modifié";
  avatar!: string;
  accessListingUsersButton: boolean = false;
  //Configuration de la fenetre modal
  dialogConfig : MatDialogConfig = new MatDialogConfig();

  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "50%";

  //Désabonnement
  private ngUnsubscribe$: Subject<boolean> = new Subject<boolean>();

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getInfos();
    this.dialogWidthHeight();
  }

  getInfos() {
    this.userService.getOneUser()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe(data => {
        console.log(data);
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        if (data.descriptif) {
          this.description = data.descriptif;
        }
        this.avatar = data.imageUrl;
        if (data.isAdmin) {
          this.accessListingUsersButton = true;
        }
      })
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

  modifyInfo() {
    //Paramétrage fermeture - click en dehors accepte
    this.dialogConfig.disableClose = false;
    // Paramétrage ouvert
    //focus sur le premier champs
    this.dialogConfig.autoFocus = true;
    //Taille de la popup
    this.dialogConfig.width = this.widthDialogu;
    this.dialogConfig.height = this.heightDialogu;
    //Insertion component dans popup
    this.dialog.open(EditProfilComponent, this.dialogConfig);
//AFTER CLOSE
    const dialogRef = this.dialog.open(EditProfilComponent, this.dialogConfig);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe( () => { this.getInfos(); this.dialog.closeAll(); });
  }

  deleteUser(){
    //Paramétrage fermeture - click en dehors accepte
    this.dialogConfig.disableClose = false;
    this.dialogConfig.autoFocus = true;
    //Taille de la popup
    this.dialogConfig.width = this.widthDialogu;
    this.dialogConfig.height = this.heightDialogu;
    //Datas
    this.dialogConfig.data = {prenom : this.firstname, nom : this.lastname};
    //Insertion component dans popup
    this.dialog.open(ConfirmDeleteAccountComponent, this.dialogConfig);
  }

  //ADMIN
  listUsers(){
    this.router.navigate(['/espace-admin']);
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe$.next(true);
    this.ngUnsubscribe$.complete();
  }
}
