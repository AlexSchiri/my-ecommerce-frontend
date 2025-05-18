import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { AuthappService } from 'src/services/authapp.service';
import { CartService } from 'src/services/cart/cart.service';
import { LocalStorageService } from 'src/services/data/local-storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  //notificationsCount : number = 0;

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
