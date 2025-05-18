import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, of, reduce, Subject } from 'rxjs';
import { Cart, CartRemote } from 'src/app/models/Cart';

import { AuthappService } from 'src/services/authapp.service';
import { CartService } from 'src/services/cart/cart.service';
import { LocalStorageService } from 'src/services/data/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userId: string = sessionStorage.getItem("Utente") || '';
  cartProducts: Cart[] = [];
  total$: Observable<number> | undefined; // Observable per il template

  totaleArticoli$ = this.cartService.Cart$;

  constructor(public BasicAuth: AuthappService, public localStorage : LocalStorageService, public cartService : CartService) { 
  
  }

  ngOnInit(): void {
    this.total$ = this.cartService.Cart$; // Inizializza total$
  }


}
