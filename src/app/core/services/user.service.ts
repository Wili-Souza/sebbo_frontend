import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/shared/models/auth-response';
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
}
