import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faUserTie, faShoppingCart, faUser, faSignOutAlt, faLongArrowAltRight, faDoorClosed } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() userLogged = false;
  @Output() logout = new EventEmitter<void>();

  icons = {
    cart: faShoppingCart,
    user: faUser,
    admin: faUserTie,
    logout: faSignOutAlt,
    arrowRight: faLongArrowAltRight,
    login: faDoorClosed
  }

  constructor() { }

  ngOnInit(): void {}

  onLogout() {
    this.logout.emit();
  }
}
