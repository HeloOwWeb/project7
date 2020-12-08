import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) { }

  create(formData: any){
    return this.httpClient.post((this.url + 'api/posts'), formData);
  }

  //Récupère les publications
  getAllPosts(): Observable<any> {
    return this.httpClient.get<any[]>(this.url + 'posts');
  }
}
