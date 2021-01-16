import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from '../models/Publication.model';

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
  getAllPosts(currentPage: number): Observable<any> {
    return this.httpClient.get((this.url + '?page=' + currentPage ));
  }

  //Modification de la Publication
  modifyPost(id: string, formData: any) : Observable<any>{
    return this.httpClient.put((this.url + id), formData);
  }

  //Suppression de la Publication
  deletePost(id: string): Observable<any>{
    return this.httpClient.delete((this.url + id));
  }

  //Pour le Current Profile
  getAllPostsCurrent() {
    return this.httpClient.get<Publication[]>((this.url + 'current'));
  }

  getOnePublication(id: string): Observable<any>{
    return this.httpClient.get((this.url + id));
  }
}
