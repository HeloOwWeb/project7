import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmotionsService {

  constructor(private httpClient : HttpClient) { }

  private url : string = "http://localhost:3000/api/posts/like/"

  //Création
  sendEmotion(id: number, objEmotion: any): Observable<any>{
    return this.httpClient.post((this.url + id), objEmotion);
  }

  //Compteurs Emotion
  getEmotionsPublication(id: number): Observable<any>{
    console.log(id);
    return this.httpClient.get((this.url + id));
  }
}
