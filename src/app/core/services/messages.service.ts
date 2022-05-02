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

  fromStatus(error: any): void {
    const status = error.status;
    if ( !status ) return;

    if ( status === 401 ) {
      this.error("Login ou senha incorretos!");
    } else if ( status === 200 ) {
      this.success("Operação bem sucedida!");
    } else if ( status === 403 ) {
      this.success("Autorização negada.");
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
