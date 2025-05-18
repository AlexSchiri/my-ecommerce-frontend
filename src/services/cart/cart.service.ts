import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { Cart } from 'src/app/models/Cart';
import { ArticoliService } from '../data/articoli.service';
import { LocalStorageService } from '../data/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  server : string = "localhost";
  port : string = "5000";
  userId : string = sessionStorage.getItem('Utente') || '';
  response : any;
  cartProducts : Cart[] = []
  items: Observable<Cart[]> | undefined; // Dichiara items come Observable<Cart[]>

  private CartSubject = new BehaviorSubject<number>(0); // Inizializzato a 0
  Cart$ = this.CartSubject.asObservable(); // Observable per i componenti

  constructor(private httpClient : HttpClient, private ArtService: LocalStorageService,private getDataService: ArticoliService) { 
    //this.userId = sessionStorage.getItem('Utente') || '';
    this.TotalCartSubject();
  }

  getRemoteCart = (userId : string): Observable<Cart[]> => {
    return this.httpClient.get<Cart[]>(`http://${this.server}:${this.port}/api/cart/cerca/${userId}`)
  }

  updRemoteCart = (cart: Cart) =>
        this.httpClient.put<Cart>(`http://${this.server}:${this.port}/api/cart/modifica`, cart);

  delRemoteCart = (cartId: number) =>
    this.httpClient.delete(`http://${this.server}:${this.port}/api/cart/elimina/` + String(cartId));

  insRemoteCart = (cart: Cart) =>
    this.httpClient.post(`http://${this.server}:${this.port}/api/cart/inserisci`, cart);

  RemoveItem(codart: string, cartId: number): void {
    if (!sessionStorage.getItem('Utente')) {
      var items = JSON.parse(localStorage.getItem('cartProducts') || '{}');
      items.forEach(function (item: any){
        if(item.codart === codart) {
          items.splice(items.indexOf(item), 1);
        }    
      })
      localStorage.setItem('cartProducts', JSON.stringify(items));
      this.TotalCartSubject();
    } else {
        this.delRemoteCart(cartId).subscribe({ // Sottoscriviti all'Observable
          next: (response) => {
          },
          error: (error) => {
            alert("Errore nella eliminazione del carrello: " + error);
          },
          complete: () => {
            this.TotalCartSubject();
          }
        });
        window.location.reload();
      }
  } 


  UpdateQty(codart: string, event: any, cartItem: Cart) {
    if (!sessionStorage.getItem('Utente')) {
      var items = JSON.parse(localStorage.getItem('cartProducts') || '{}');
      items.forEach(function (item: any){
        if(item.codart === codart) {
          item.qty = Number(event.target.value);
        }
      })
      localStorage.setItem('cartProducts', JSON.stringify(items));
      this.TotalCartSubject();
    }
    else {
      const qty = Number(event.target.value);
      const cart: Cart = { ...cartItem, qty: qty }; // Crea un nuovo oggetto Cart con la quantità aggiornata
      this.updRemoteCart(cart).subscribe({ // Sottoscriviti all'Observable
        next: (response) => {
        },
        error: (error) => {
          alert("Errore nell'aggiornamento del carrello: " + error);
        },
        complete: () => {
          this.TotalCartSubject();
        }
      });

    }
  }


  deleteCart(): void {
    this.ArtService.emptyCart();
  }


  getCount(): Observable<number> {
    if (!sessionStorage.getItem("Utente")) {
      let cartProducts = JSON.parse(localStorage.getItem('cartProducts') || '{}');
      let total = 0;
      if (cartProducts != null) {
        for (var item in cartProducts) {
          total += cartProducts[item]['qty'];
        }
      }
      return of(total);
    } else {
      this.items = this.getRemoteCart(this.userId); // Assegna l'Observable a this.items
      return this.items!.pipe( // Usa "!" per indicare che this.items è definito (non undefined) a questo punto
        tap(data => console.log("dati recuperati da getRemoteCart:", data)), // controlla i dati
        map(data => {
          let total = 0;
          for (const obj of data) {
            total += obj.qty;
          }
          return total;
        })
      );
    }
  }


  public TotalCartSubject() : void {
    const valoreSalvato$ = this.getCount(); // Ottieni l'Observable
    valoreSalvato$.pipe(take(1)).subscribe(valoreSalvato => { // Usa 'take(1)'
      if (valoreSalvato !== null && valoreSalvato !== undefined) { // Gestisci null/undefined
        this.CartSubject.next(valoreSalvato);
      } else {
          // Gestisci il caso in cui non c'è un valore salvato, ad esempio:
          this.CartSubject.next(0); // Valore di default
      }
    });
  }


}