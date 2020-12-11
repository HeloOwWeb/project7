import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000/api/';

  constructor(private httpClient : HttpClient) { }

  signupUser(objUser: any): Observable<any> {
    return this.httpClient.post((this.url + 'auth/signup'), objUser);
  }

  loginUser(objUser: any): Observable<any> {
    return this.httpClient.post((this.url + 'auth/login'), objUser);
  }

  //Récupère les infos de userCurrent
  getOneUser(): Observable<any> {
    return this.httpClient.get<any[]>((this.url + 'user'));
  }

}
