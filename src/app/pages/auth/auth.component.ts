import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showErrorMessages = false;

  loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  registerForm = this.fb.group({
    name: ["", Validators.required],
    email: ["", Validators.required],
    phone: ["", Validators.required],
    password: ["", Validators.required],
    confirmPassword: ["", Validators.required]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(["home"]);
  }

  login(): void {
    if ( this.loginForm.valid ) {
      if (this.showErrorMessages) this.showErrorMessages = false;
      const data = this.loginForm.value;
      console.log(data);
    } else {
      this.showErrorMessages = true;
    }
  }

  register(): void {
    if ( this.registerForm.valid ) {
      if (this.showErrorMessages) this.showErrorMessages = false;
      const data = this.registerForm.value;
      console.log(data);
    } else {
      this.showErrorMessages = true;
    }
  }
}
