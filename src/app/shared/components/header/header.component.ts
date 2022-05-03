import { Component, OnInit } from '@angular/core';
import { faUserTie, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userLogged = false;

  icons = {
    cart: faShoppingCart,
    user: faUser,
    admin: faUserTie
  }

  constructor(
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.makeSubscriptions();
  }

  private makeSubscriptions(): void {
    this.sessionService.user.subscribe( user => {
      if ( user ) this.userLogged = true;
      else this.userLogged = false;

      // TODO: future authorization for admin
    });
  }

}
