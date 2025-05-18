import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/services/cart/cart.service';
import { LocalStorageService } from 'src/services/data/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Cart[] = []
  userId = sessionStorage.getItem('Utente') || '';

  constructor(private cartService: CartService,private ArtService: LocalStorageService) {
  
  }

  ngOnInit(): void {
    
    if (sessionStorage.getItem('Utente')) {
      this.cartService.getRemoteCart(this.userId).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)});
    } else {
    this.cartProducts  = this.ArtService.getItems();
    }

  }

  handleResponse(response : any) {
    this.cartProducts = response;
    console.log(this.cartProducts);
  }

  handleError(error: any) {
    console.log(error);
  }

  UpdateQty(codart: string, event: any, cartItem: Cart) {
    this.cartService.UpdateQty(codart, event, cartItem);
  }

  RemoveItem(codart: string,cartId: number) {
    this.cartService.RemoveItem(codart, cartId)
  }

  deleteCart() {
     this.cartService.deleteCart();
  }
 
}
