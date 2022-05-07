import { Component } from '@angular/core';
import { footerSections } from 'src/assets/data/footer-sections';
import { AuthService } from './core/services/auth.service';
import { MessagesService } from './core/services/messages.service';
import { SessionService } from './core/services/session.service';
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
    private messagesService: MessagesService
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
      this.authService.getUserByToken().subscribe(() => {}, 
        error => {
          this.authService.logout();
          this.messagesService.fromStatus(error);
        }
      );
    } else {
      this.isUserLogged = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
