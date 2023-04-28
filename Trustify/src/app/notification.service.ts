import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar, private zone: NgZone) { }

  showSuccess(message: string): void {
    this.zone.run(() => {
      this.snackBar.open(message, '', { duration: 4000 });
    });
  }

  showError(message: string): void {
    this.zone.run(() => {
      /*
      @param: error message
      @param: button text 
      @param: snackBar's css class
      */
      this.snackBar.open(message, 'X', { panelClass: ['error'] });
    });
  }
}