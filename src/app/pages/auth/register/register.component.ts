import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MessagesService } from 'src/app/core/services/messages.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showErrorMessages = false;

  registerForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    phone: ["", [Validators.required, Validators.pattern("[0-9 ]{11}")]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
  }, { validator: this.mustMatch('password', 'confirmPassword')});

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {}

  register(): void {
    if ( this.registerForm.valid ) {
      if (this.showErrorMessages) this.showErrorMessages = false;
      const data = this.registerForm.value as User;
      this.authService.register(data).subscribe( data => {
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
    return this.registerForm?.controls[controlName];
  }

  navigateBack(): void {
    this.router.navigate(["/home"]);
  }
}
