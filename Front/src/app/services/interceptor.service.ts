import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { KeyService } from './key.service';
// intercepte les réponses http de l’API pour vérifier s’il y a eu des erreurs. S’il y a une réponse non autorisée 401, l’utilisateur est automatiquement déconnecté de l’application, toutes les autres erreurs sont renvoyées au service appelant de sorte qu’une alerte avec l’erreur peut être affichée à l’écran

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor( private key : KeyService, private cookie: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authToken;
    if (this.cookie.check('Doris')) {
      authToken = this.key.getAuth();   
    } else {
      authToken = '';
    }
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    return next.handle(newRequest);
  }

}
