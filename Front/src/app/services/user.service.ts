import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { KeyService } from './key.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/api/';
  //Récup Token
  private _token!: any;
  isLog: boolean = false;

  constructor(private httpClient : HttpClient, private keyService : KeyService,
    private cookie : CookieService) { }

  //----------------------------SIGN UP
  signupUser(objUser: any): Observable<any> {
    return this.httpClient.post((this.url + 'auth/signup'), objUser);
  }
  //----------------------------LOGIN
  loginUser(objUser: any): Observable<any> {
    return this.httpClient.post((this.url + 'auth/login'), objUser)
      //token
      .pipe(
        tap((response) => {
          this._token = response;
          this.keyService.getKey(this._token);
          console.log(this._token);
        }));
  }
  //Services Etat connexion
  stateConnect() {
    if(this.cookie.check('Doris')){
      this.isLog = true;
    } else {
      this.isLog = false;
    }
    return this.isLog;
  }

  //Modifier la description et/ou la photo de profil par défaut
  modifyInfoCurrentUser(infos: FormData): Observable<any>{
    return this.httpClient.put((this.url + 'users/modify'), infos);
  }

  //Supprimer le compte de l'utilisateur
  deleteAccount(): Observable<any>{
    return this.httpClient.delete((this.url + 'users/'));
  }

  //Supprimer le compte de l'utilisateur
  adminDeleteAccount(id : string): Observable<any>{
    return this.httpClient.delete((this.url + 'users/' + id));
  }

  //Récupère les infos de userCurrent
  getOneUser(): Observable<any> {
    return this.httpClient.get<any[]>((this.url + 'users/current'));
  }

  //Récupère all Users
  getListUsers(): Observable<any>{
    return this.httpClient.get((this.url+ 'users/'));
  }
}
