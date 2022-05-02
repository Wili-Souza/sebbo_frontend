import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User|undefined>(undefined);

  constructor() { }

  setUser(user: User) {
    this.user.next(user);
    console.log("user setado como: ", user);
  }

  getCurrentUser(): User | undefined {
    return this.user.value;
  }
}
