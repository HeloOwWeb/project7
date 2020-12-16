import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {

  //Générer Key
  private base: string = 'ABCDEFGH-IJK.LMNOP-QRSTUVWXYZabcdefghijklmnopqrstuvwx.yz0123456789';
  private random1: String = '';
  private random2: String = '';
  private _key!: String;

  //Decoded
  private token: string = 'ECHEC';
  private stringRandomA: any = 'ECHEC';
  private stringRandomB: any = 'ECHEC';
  private decodedKey!: any;

  constructor(private cookieService: CookieService) { }
  //---------------------------------------------------------------------------------ENCODE
  //---------------------------------------------------------------------------------
  //Encoder la longueur du random
  private encodeRandom(length: number, name: string) {
    let textLength = length.toString();
    for (let i = 0; i < length; i++) {
      textLength = textLength.replace('0', 'J');
      textLength = textLength.replace('1', 'g');
      textLength = textLength.replace('2', 'Z');
      textLength = textLength.replace('3', 'u');
      textLength = textLength.replace('4', 'M');
      textLength = textLength.replace('5', 'Q');
      textLength = textLength.replace('6', 'k');
      textLength = textLength.replace('7', 'A');
      textLength = textLength.replace('8', 'E');
      textLength = textLength.replace('9', 'x');
    }
    return localStorage.setItem(name, textLength);
  }
  //Generer une clé
  private generateKey(token: any) {
    token = token.token;
    for (let i = 1; i < 487; i++) {
      //RANDOM 1
      this.random1 += this.base[Math.floor(Math.random() * this.base.length)];
    }
    //Encode et ajout dans le localstorage
    this.encodeRandom(this.random1.length, 'Nemo');
    //RANDOM 1
    for (let i = 1; i < 319; i++) {
      this.random2 += this.base[Math.floor(Math.random() * this.base.length)];
    }
    //Encode et ajout dans le localstorage
    this.encodeRandom(this.random2.length, 'Marin');
    //Crée cookie
    this._key = this.random1 + token + this.random2;
    return this.cookieService.set('Doris', JSON.stringify(this._key), { expires: 1 });
  }
  // envoie de la clé
  getKey(token: any) {
    this.generateKey(token);
  }
  //---------------------------------------------------------------------------------DECODE
  //---------------------------------------------------------------------------------
  //Décoder longueur du random
  private decodRandom(textLength: string) {
    for (let i = 0; i < textLength.length; i++) {
      textLength = textLength.replace('J', '0');
      textLength = textLength.replace('g', '1');
      textLength = textLength.replace('Z', '2');
      textLength = textLength.replace('u', '3');
      textLength = textLength.replace('M', '4');
      textLength = textLength.replace('Q', '5');
      textLength = textLength.replace('k', '6');
      textLength = textLength.replace('A', '7');
      textLength = textLength.replace('E', '8');
      textLength = textLength.replace('x', '9');
    }
    const number = Number(textLength);
    return number;
  }
  //Décoder la clé
  private decodedToken() {
    if (localStorage.getItem('Marin') && localStorage.getItem('Nemo')) {
      //random A
      this.stringRandomA = localStorage.getItem('Nemo');
      const randomA = this.decodRandom(this.stringRandomA);
      //random B
      this.stringRandomB = localStorage.getItem('Marin');
      const randomB = this.decodRandom(this.stringRandomB);
      //Décode le cookie
      this.decodedKey = this.cookieService.get('Doris');
      this.token = this.decodedKey.slice(randomA + 1, -(randomB + 1));
    }
    return this.token;
  }
  //envoi le token
  getAuth() {
    return this.decodedToken();
  }
  //---------------------------------------------------------------------------------SE DECONNECTER
  //---------------------------------------------------------------------------------
  deleteAuth() {
    localStorage.clear();
    this.cookieService.deleteAll();
  }
}
