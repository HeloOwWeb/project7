import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publication } from '../models/Publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url = 'http://localhost:3000/api/posts/';

  constructor(private httpClient: HttpClient) { }

  create(formData: any) {
    return this.httpClient.post((this.url), formData);
  }

  //Récupère les publications
  getAllPosts() {
    return this.httpClient.get<Publication[]>(this.url);
  }

  getAllPostsCurrent() {
    return this.httpClient.get<Publication[]>((this.url + 'current'));
  }
}
