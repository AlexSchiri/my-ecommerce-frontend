import { Component, OnInit } from '@angular/core';

import { AuthappService } from 'src/services/authapp.service';
import { CartService } from 'src/services/cart/cart.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private BasicAuth: AuthappService, private cartService : CartService) { }

  ngOnInit(): void {
    this.BasicAuth.clearAll();
    this.cartService.TotalCartSubject();
  }

}
