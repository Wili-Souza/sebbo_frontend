import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { PurchaseService } from 'src/app/core/services/purchase.service';
import { SessionService } from 'src/app/core/services/session.service';
import { UserService } from 'src/app/core/services/user.service';
import { Purchase } from 'src/app/shared/models/purchase';
import { PurchaseItem } from 'src/app/shared/models/purchase-item';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userEditable = false;
  purchases: Purchase[] = [];
  user?: User;
  icons = {
    edit: faEdit
  }

  // TODO: mostrar erros específicos para cada campo 
  userForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.pattern("[0-9 ]{11}")]]
  });

  constructor(
    private location: Location,
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private messagesService: MessagesService,
    private userService: UserService,
    private purchaseService: PurchaseService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.sessionService.user.subscribe( userData => {
      this.user = userData;
      this.userForm.patchValue(this.user || {});
      if ( userData?.id ) {
        this.getPurchases(userData.id);
      }
    });
  }

  private getPurchases(userId: string) {
    this.purchaseService.getAll(userId).subscribe(
      purchases => { this.purchases = purchases; console.log(this.purchases);
       },
      error => this.messagesService.error(error.error.messages)
    );
  }

  goback(): void {
    this.location.back();
  }

  enableUserEdit() {
    this.userEditable = true;
  }

  deleteAccount() {
    const confirmed = confirm("Deseja realmente deletar sua conta? Essa ação é permanente.");
    if (confirmed && this.user?.id) {
      this.userService.delete(this.user?.id).subscribe(
        () => this.logout(),
        error => console.log(error)
      )
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

  saveUserData() {
    if ( this.userForm.valid ) {
      const userData = this.userForm.value as User;
      const newUser = { id: this.user?.id, ...userData};
      this.updateUser(newUser);
      this.userEditable = false;
    } else {
      this.messagesService.error("Nenhum dos campos de usuário pode estar em branco.")
    }
  }

  cancelUserChange() {
    this.userForm.patchValue(this.user || {});
    this.userEditable = false;
  }


  getValorTotal(items: PurchaseItem[]) {
    let value = 0;
    items.forEach( item => {
      value += item.quantity * item.book.price;
    })
    return value;
  }

  private updateUser(user: User) {
    this.userService.update(user).subscribe( 
      user => { this.sessionService.setUser(user) }, 
      error => console.log(error)
    );
  }
}
