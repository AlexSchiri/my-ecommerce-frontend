import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthappService } from './authapp.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private BasicAuth: AuthappService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot)  {

    console.log('islogged: ' + this.BasicAuth.isLogged());

    if ((this.BasicAuth.isLogged() && (state.url === '/' || state.url == '/login'))) {
      this.router.navigate(['/articoli']); 
      return false; // Impedisci l'accesso alla pagina di login
    } else if (this.BasicAuth.isLogged()) {
      return true; // Permetti l'accesso
    } else {
      // L'utente non è autenticato, permetti l'accesso alla pagina di login (o reindirizza al login se non ci si trova già)
      if (state.url !== '/') {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
  }
}
