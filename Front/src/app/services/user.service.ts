import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/';
  //Mix
  user = new Subject<User>();
  _token = this.User.token;

  constructor(private httpClient : HttpClient, private User: User) { }

  //Récupère les infos de userCurrent
  getOneUser(token: string): Observable<any> {
    console.log(this._token);
    return this.httpClient.get<any[]>(this.url + 'user' + token);
  }

}
