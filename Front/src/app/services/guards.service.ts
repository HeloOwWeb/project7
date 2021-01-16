import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class GuardsService implements CanActivate  {

  constructor(private userService: UserService,
    private router: Router, private cookie : CookieService) { }

  canActivate(
    //L'instantané du router renvoie un boolean, une promise
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
    //si true accès à la route protégée
    if ( localStorage.getItem('Nemo') && this.cookie.check('Doris') ){
      return true;
      //sinon retour au login
    } else {
      return this.router.navigate(['/auth']);
    }
  }
}

//garde de route angulaire utilisé pour empêcher les utilisateurs non authentifiés d’accéder aux routes restreintes,
