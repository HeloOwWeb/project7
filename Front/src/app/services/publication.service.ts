import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publication } from '../models/Publication.model';
import { Pagination } from '../models/PaginationPosts.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  private url = 'http://localhost:3000/api/posts/';

  constructor(private httpClient: HttpClient) { }

  //Créer une publication ____________________________
  create(formData: any) {
    return this.httpClient.post((this.url), formData);
  }

  //Récupère les publications ________________________
  // Pour le Home
  getAllPosts(): Observable<any> {
    return this.httpClient.get(this.url);
  }
  //Pour le Current Profile
  getAllPostsCurrent() {
    return this.httpClient.get<Publication[]>((this.url + 'current'));
  }

  //Envoi du like/dislike ____________________________
  sendLike(etatLike: any, id: number): Observable<any> {
    return this.httpClient.post((this.url + id + '/like'), etatLike);
  }
}
