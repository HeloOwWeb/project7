import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User.model';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { EditProfilComponent } from '../edit-profil/edit-profil.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  firstname!: string;
  lastname!: string;
  description: string = "Aucune description pour en ajouter une cliquer sur le bouton modifié";
  avatar!: string;

  //Taille fenetre modal
  widthDialogu: string = "100%";
  heightDialogu: string = "75%";

  constructor(private userService: UserService, private dialog: MatDialog, public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.getInfos();
    this.dialogWidthHeight();
  }

  getInfos() {
    this.userService.getOneUser()
      .subscribe(data => {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        if (data.descriptif) {
          this.description = data.descriptif;
        }
        this.avatar = data.imageUrl;
      })
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

  modifyInfo() {
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
    this.dialog.open(EditProfilComponent, dialogConfig);
  }

  deleteUser(){
    console.log("A FAIRE");
  }
}
