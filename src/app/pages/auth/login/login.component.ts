import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {}

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
    return this.loginForm?.controls[controlName];
  }
}
