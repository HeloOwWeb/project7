import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardsService /* implements CanActivate */ {

/*   constructor(private userService: UserService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    //si true accès à la route protégée
    if (this.UserService.isAuth || localStorage.getItem('currentUser') ) {
      return true;
      //sinon retour au login
    } else {
      this.router.navigate(['/auth/login']);
    }
  } */
}

//garde de route angulaire utilisé pour empêcher les utilisateurs non authentifiés d’accéder aux routes restreintes,
