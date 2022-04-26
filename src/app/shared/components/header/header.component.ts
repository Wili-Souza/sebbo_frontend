import { Component, OnInit } from '@angular/core';
import { faUserTie, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  icons = {
    cart: faShoppingCart,
    user: faUser,
    admin: faUserTie
  }

  constructor() { }

  ngOnInit(): void {
  }

}
