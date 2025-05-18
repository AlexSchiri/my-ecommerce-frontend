import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/services/cart/cart.service';
import { ArticoliService } from 'src/services/data/articoli.service';

@Component({
  selector: 'app-detail-articoli',
  templateUrl: './detail-articoli.component.html',
  styleUrls: ['./detail-articoli.component.css']
})
export class DetailArticoliComponent implements OnInit {

  CodArt: string = "";
  inputNumber: number = 0;
  items: any = [];
  cart: Cart = {
    codart: '',
    qty: 0,
    userId: '',
    id: 0
  }

  user: string = "";

  articolo: IArticoli = {
    codArt: '',
    descrizione: '',
    um: '-1',
    codStat: '',
    pzCart: 0,
    pesoNetto: 0,
    prezzo: 0,
    idStatoArt: '1',
    desStatoArt: '',
    dataCreazione: new Date(),
    imageUrl: '',
    idIva: -1,
    idFamAss: -1,
    categoria: '',
    ean: []
  };

  Iva: IIva[] = [];
  Cat: ICat[] = [];

  ean: string = "";

  constructor(private articoliService: ArticoliService, private route: ActivatedRoute, 
    private cartService: CartService, private router: Router) { 
      this.cartService.TotalCartSubject();
    }

  ngOnInit(): void {

    this.CodArt =  this.route.snapshot.params['codart'];
    if (this.CodArt) {
      this.articoliService.getArticoliByCode(this.CodArt).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });
    };

    this.user = sessionStorage.getItem('Utente') || ""
    
  }

  addToCart(codart: string) {
    let local_storage;
    let itemsInCart = []
    this.items = {
      codart: codart,
      qty: this.inputNumber
    }
    if(!sessionStorage.getItem('Utente')) {
      if(localStorage.getItem('cartProducts')  == null){
        local_storage = [];
        itemsInCart.push(this.items);
        localStorage.setItem('cartProducts', JSON.stringify(itemsInCart));
      }
      else
      {
        local_storage = JSON.parse(localStorage.getItem('cartProducts') || '{}');
        for(var i in local_storage)
        {
          if(this.items.codart == local_storage[i].codart && this.items.qty > 0)
          {
            local_storage[i].qty += this.items.qty;
            this.items=null;
            break;  
          }
        }
        if(this.items){
          itemsInCart.push(this.items);
        }
        local_storage.forEach(function (item: any){
          itemsInCart.push(item);
        })
        localStorage.setItem('cartProducts', JSON.stringify(itemsInCart));
    }
    } else {
      const cart: Cart = {  
        codart: codart,
        qty: this.inputNumber,
        userId: this.user,
        id : 0
      };
      this.cartService.insRemoteCart(cart).subscribe({
        error: (error) => {
          alert(error);
        }
      });
    }
    this.cartService.TotalCartSubject();
  }
      
  handleResponse(response : any) {
    this.articolo = response;
    if (this.articolo.ean === undefined) {
      this.ean = ""
    } else {
      this.ean = (this.articolo.ean) ? this.articolo.ean[0].barcode : "";
    }
  }

  handleError(error: any) {
    console.log(error);
  }

}
