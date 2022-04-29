import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  showErrorMessages = false;

  loginForm = this.fb.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  });

  // loginForm = this.fb.group({
  //   name: ["", Validators.required],
  //   email: ["", Validators.required],
  //   phone: ["", Validators.required],
  //   password: ["", Validators.required],
  //   confirmPassword: ["", Validators.required]
  // });

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
      // TODO: integrate with login route
      const data = this.loginForm.value;
      console.log(data);
      
    } else {
      this.showErrorMessages = true;
    }
  }

  c(controlName: string): AbstractControl {
    return this.loginForm.controls[controlName];
  }

}
