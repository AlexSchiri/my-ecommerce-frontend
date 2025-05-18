import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, delay, map, of } from 'rxjs';

import { AuthappService } from 'src/services/authapp.service';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userId: string = "";
  password: string = "";

  autenticato: boolean = true;
  filter$: Observable<string | null> = of("");
  notlogged : boolean = false;

  orderby: string = "";

  errMsg: string = "Spiacente, la userid e/o la password sono errati!";
  errMsg2: string = "Spiacente, devi autenticarti per poter accedere alla pagina selezionata!";

  titolo: string = "Accesso & Autenticazione";
  sottotitolo: string = "Procedi ad inserire la userid e la password";

  constructor(private route: Router, private route2: ActivatedRoute, private BasicAuth: AuthappService, 
    private cartService : CartService) { 
      this.cartService.TotalCartSubject();
    }

  ngOnInit(): void {
    this.filter$ = this.route2.queryParamMap.pipe(
      map((params: ParamMap) => params.get('nologged')),
    );
    this.filter$.subscribe(param => (param) ? this.notlogged = true : this.notlogged = false);

  }

  gestAuth = (): void => {
    
    this.BasicAuth.autenticaService(this.userId, this.password).subscribe({
      next: (response) => {
        sessionStorage.setItem("Utente", this.userId);
        this.autenticato =true;
        this.route.navigate(['welcome', this.userId]);
        this.cartService.TotalCartSubject();
      },
      error: (error) => {
        console.log(error);
        this.autenticato = false;
      },
      complete: () => {
        this.cartService.TotalCartSubject();
      }
    });

  }

}
