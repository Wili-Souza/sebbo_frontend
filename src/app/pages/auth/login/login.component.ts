import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showErrorMessages = false;

  loginForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private location: Location,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    console.log("login started");}

  login(): void {
    if ( this.loginForm.valid ) {
      if (this.showErrorMessages) this.showErrorMessages = false;
      const data = this.loginForm.value;
      this.userService.login(data.email, data.password).subscribe( user => {
        this.authService.setUser(user);
        this.navigateBack();
      }, error => this.showMessageFromStatus(error));
    } else {
      this.showErrorMessages = true;
    }
  }

  showMessage(message: string): void {
    this.messagesService.error(message);
  }

  showMessageFromStatus(message: string): void {
    this.messagesService.fromStatus(message);
  }

  c(controlName: string): AbstractControl {
    return this.loginForm?.controls[controlName];
  }

  navigateBack(): void {
    this.location.back();
  }
}
