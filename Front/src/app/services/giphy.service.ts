import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
/*
const urlTrendyGiphy = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKeyGiphy + '&limit=10&rating=g';
// Récupérer l'ID dans les métadonnées pour save dans BDD
const giphy = $.get(urlApiGiphy);
giphy.done(function (data) { console.log("success got data", data); });

// Puis requête par ID pour les VIEW ALL
const idGif = 'dodotest';
const urlGifID = 'https://api.giphy.com/v1/gifs/' + idGif + '?api_key=' + apiKeyGiphy;
*/

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  private apiKeyGiphy = 'rXJyJPJMUR2gXgQoT0I626vjs1ARMILl';
  private baseUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKeyGiphy + '&q=';
  private paramsUrl = '&limit=15&offset=0&rating=g&lang=fr';

  constructor(private httpClient: HttpClient) { }

  //RECHERCHE
  searchGiphy(textSearchObj: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + textSearchObj + this.paramsUrl)
  }
}
