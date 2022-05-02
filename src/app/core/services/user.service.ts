import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = environment.apiUrl + "user/";

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string): Observable<User> {
    const loginUrl = this.URL + "login";
    const body = { email, password }
    return this.http.post<User>(loginUrl, body);
  }

  register(user: User): Observable<User> {
    const loginUrl = this.URL + "register";
    return this.http.post<User>(loginUrl, user);
  }
}
