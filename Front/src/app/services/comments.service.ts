import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  url: string = "http://localhost:3000/api/posts/comment/"; //+id
  url2: string = "http://localhost:3000/api/posts/commentOne/"; //+id

  constructor(private httpClient : HttpClient) { }

  //créer un commentaire
  createComment(id: string, objComment: any){
    return this.httpClient.post((this.url + id), objComment);
  }

  //modifier commentaire selon id comment
  modifyComment(id: string, objComment: any): Observable<any>{
    return this.httpClient.put((this.url + id), objComment);
  }

  //supprimer un commentaire selon id comment
  deleteComment(id: string): Observable<any>{
    return this.httpClient.delete((this.url + id));
  }

  //récupérer les commentaires selon id Post
  getAllComments(id: string): Observable<any>{
    return this.httpClient.get((this.url + id));
  }

  //récupérer un commentaire selon id Commentaire
  getOneComment(id: string): Observable<any>{
    return this.httpClient.get((this.url2 + id ));
  }
}
