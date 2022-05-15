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

  update(user: User): Observable<User> {
    const url = this.URL + user.id + "/update";
    return this.http.put<User>(url, user);
  }

  delete(userId: string): Observable<Object> {
    const url = this.URL + userId + "/delete";
    return this.http.delete<Object>(url);
  }
}
