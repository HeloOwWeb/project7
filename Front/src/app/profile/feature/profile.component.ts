import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(private userService: UserService, private snackBar: MatSnackBar) { }

  //Données
  nom!: string;
  prenom!: string;
  email!: string;
  avatar!: string;

  //Desabonnement
  private _isDead$: Subject<void> = new Subject();

  ngOnInit(): void {
    /*this.getDatas("token");*/
  }

  //Récupérer le token
  getToken() {
    console.log("Idée Token ?");
  }

  //Récupérer les infos Current User
  getDatas(token: string) {
    this.userService.getOneUser(token)
      //Désabonnement
      .pipe(takeUntil(this._isDead$))
      .subscribe(datas => {
        this.nom = datas.lastname;
        this.prenom = datas.firstname;
        this.email = datas.email;
        this.avatar = datas.avatar;
      }, (error) => {
          console.log(error);
          this.snackBar.open("Probleme serveur, veuillez nous excuser.", "", { duration: 4000 });
      }
    );
  }

  ngOnDestroy(): void {
    this._isDead$.next();
  }
}
