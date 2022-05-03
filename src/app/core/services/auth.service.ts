import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from 'src/app/shared/models/auth-response';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.apiUrl + "user/";

  constructor(
    private sessionService: SessionService,
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<AuthResponse> {
    const loginUrl = this.URL + "login";
    const body = { email, password }
    return this.http.post<AuthResponse>(loginUrl, body).pipe(
      tap(res => this.setSession(res))
    )
  }

  register(user: User): Observable<AuthResponse> {
    const loginUrl = this.URL + "register";
    return this.http.post<AuthResponse>(loginUrl, user);
  }
          
  private setSession(authResponse: AuthResponse) {
      localStorage.setItem('jwt_token', authResponse.token);
      this.sessionService.setUser(authResponse.user);
  }          

  logout() {
      localStorage.removeItem("jwt_token");
      this.sessionService.resetUser();
  }       

  isLoggedIn() {
      return !!localStorage.getItem("jwt_token");
  }       

  isLoggedOut() {
      return !this.isLoggedIn();
  }
}
