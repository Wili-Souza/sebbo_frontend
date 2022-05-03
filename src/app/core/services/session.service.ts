import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  user = new BehaviorSubject<User|undefined>(undefined);

  constructor() { }

  setUser(user: User) {
    this.user.next(user);
    console.log("user setado como: ", user);
  }

  resetUser(): void {
    this.user.next(undefined);
  }

  getCurrentUser(): User | undefined {
    return this.user.value;
  }
}
