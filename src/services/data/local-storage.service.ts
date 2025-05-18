import { Injectable } from '@angular/core';
import { map, Observable, of, reduce } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { Cart } from 'src/app/models/Cart';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  constructor() {

  }

  // Set a value in local storage
  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  // Get a value from local storage
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  getItems(): [] {
    return JSON.parse(localStorage.getItem('cartProducts') || '{}');
  } 

  // Remove a value from local storage
  emptyCart(): void {
    if (!sessionStorage.getItem("Utente")) {
      if (confirm('Are you sure you want to delete items in cart?')) {
        localStorage.removeItem('cartProducts');
        window.location.reload();
      }
    }
  }

  // Clear all items from local storage
  clear(): void {
    if (!sessionStorage.getItem("Utente")) {
    localStorage.clear();
    }
  }


  
}