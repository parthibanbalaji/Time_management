import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuardLogin implements CanActivate {

  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('token')) {
        return true;
    }

    this.router.navigate(['/'], {
      queryParams: {
        return: state.url
      }
    });
    return false;
  }
}