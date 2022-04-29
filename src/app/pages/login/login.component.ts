import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
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
    console.log(this.loginForm);
    
  }

}
