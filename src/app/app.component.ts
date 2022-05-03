import { Component } from '@angular/core';
import { footerSections } from 'src/assets/data/footer-sections';
import { AuthService } from './core/services/auth.service';
import { SessionService } from './core/services/session.service';
import { UserService } from './core/services/user.service';
import { FooterSection } from './shared/models/footer-section';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  footerSections: FooterSection[] = footerSections;
  isUserLogged = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserData();
  }

  private subscribeToUserData(): void {
    this.sessionService.user.subscribe( user => {
      this.checkUser(user);
    })
  }

  private checkUser(user?: User): void {
    if ( user ) {
      this.isUserLogged = true;
    } else if ( this.authService.isLoggedIn() ) {
      this.authService.getUserByToken().subscribe();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
