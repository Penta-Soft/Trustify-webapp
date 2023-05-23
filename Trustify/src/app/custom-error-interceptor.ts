import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CustomErrorHandler implements ErrorHandler {
  private errorMessage: string = '';
  handleError(error: any): void {
    this.errorMessage = error.message;

    if (
      error.message.includes('Start must be less than the length of the array')
    ) {
      this.errorMessage = 'Nessuna recensione trovata da caricare';
    } else if (error.message.includes('bad address checksum')) {
      this.errorMessage = 'Indirizzo non valido';
    } else if (
      error.message.includes('This company have not received any reviews')
    ) {
      this.errorMessage = '';
    } else if (error.message.includes('User denied transaction signature')) {
      this.errorMessage = 'Transazione annullata da MetaMask';
    } else if (
      error.message.includes(
        'The requested account and/or method has not been authorized by the user'
      )
    ) {
      this.errorMessage =
        "Errore: l'account MetaMask non è autorizzato a eseguire questa operazione";
    } else if (error.message.includes('User rejected the request')) {
      this.errorMessage = 'Richiesta annullata da MetaMask';
    } else if (
      error.message.includes(
        "Request of type 'wallet_requestPermissions' already pending for origin"
      )
    ) {
      this.errorMessage = 'Richiesta già in corso, controlla MetaMask';
    } else if (error.message.includes('You have not released any reviews')) {
      return;
    } else if (error.message.includes('invalid address')) {
      this.errorMessage = 'Indirizzo non valido';
    }

    if (this.errorMessage != '') {
      this.snackBar.open(this.errorMessage, 'Close', {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, 'Close', { duration: 5000 });
  }

  constructor(private snackBar: MatSnackBar) {}
}
