import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private httpClient : HttpClient, private keyService : KeyService) { }

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

  //Récupère les infos de userCurrent
  getOneUser(): Observable<any> {
    return this.httpClient.get<any[]>((this.url + 'users/current'));
  }

}
