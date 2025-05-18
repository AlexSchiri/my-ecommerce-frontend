import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { CartService } from './cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor(private httpClient : HttpClient) {

   }

  autenticaService(UserId: string, Password: string) {
    
    let authString = "Basic " + window.btoa(UserId + ":" + Password);
    let headers = new HttpHeaders(
      {Authorization: authString }
    )
    
    return this.httpClient.get<ApiMsg>(
      'http://localhost:5000/api/articoli/test', {headers}).pipe(
        map(
          data => {
            sessionStorage.setItem("Utente", UserId);
            sessionStorage.setItem("AuthToken", authString);
            return data;
          }
        )
    );
  }


  loggedUser = (): string | null => (sessionStorage.getItem("Utente")) ? sessionStorage.getItem("Utente") : "";

  isLogged = (): boolean => (sessionStorage.getItem("Utente")) ? true : false;

  clearUser = (): void => sessionStorage.removeItem("Utente");

  clearAll = (): void => sessionStorage.clear();
}
