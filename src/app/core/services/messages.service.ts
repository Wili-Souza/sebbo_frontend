import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  durationInSeconds = 5;
  action = "Close";

  constructor(
    private snackBar: MatSnackBar
  ) {}

  fromStatus(errorRes: any): void {
    const status = errorRes.status;
    if ( !status ) return;
    if ( status === 401 ) {
      this.error("Login ou senha incorretos!");
    } else if ( status === 200 ) {
      this.success("Operação bem sucedida!");
    } else if ( status === 403 ) {
      this.error("Autorização negada.");
    } else if ( status === 422 ) {
      this.error("Email ou senha incorretos.");
    } else if ( status === 500 ) {
      this.error(errorRes.error.message || "Erro interno, tente novamente mais tarde.");
    }
  }

  error(message: string) {
    this.open( message, ["red-snackbar"]);
  }

  success(message: string): void {
    this.open( message, ["green-snackbar"]);
  }

  open(message: string, classes: string[]): void {
    this.snackBar.open(
      message, "x", {
        duration: this.durationInSeconds * 1000,
        panelClass: classes,
        verticalPosition: "top",
        horizontalPosition: "right"
      }
    );
  }
}
