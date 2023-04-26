import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})

export class ErrorHandlerService implements ErrorHandler {

  constructor(private notifier: NotificationService) { }

  handleError(error: Error): void {
    this.notifier.showError(error.message);
    console.error(error);
  }

}
