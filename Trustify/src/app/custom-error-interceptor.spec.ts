import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from './custom-error-interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CustomErrorHandler', () => {
  let customErrorHandler: CustomErrorHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatSnackBar],
      imports: [MatSnackBarModule, BrowserAnimationsModule],
    });
    const snackBar = TestBed.inject(MatSnackBar);
    customErrorHandler = new CustomErrorHandler(snackBar);
  });

  it('should be created', () => {
    expect(customErrorHandler).toBeTruthy();
  });

  it('should set errorMessage correctly for specific error messages', () => {
    const mockError = {
      message: 'Start must be less than the length of the array',
    };
    customErrorHandler.handleError(mockError);
    expect(customErrorHandler['errorMessage']).toBe(
      'Nessuna recensione trovata da caricare'
    );
  });

  it('should set errorMessage correctly for different error messages', () => {
    const mockError1 = { message: 'bad address checksum' };
    const mockError2 = {
      message: 'This company have not received any reviews',
    };
    const mockError3 = { message: 'User denied transaction signature' };

    customErrorHandler.handleError(mockError1);
    expect(customErrorHandler['errorMessage']).toBe('Indirizzo non valido');

    customErrorHandler.handleError(mockError2);
    expect(customErrorHandler['errorMessage']).toBe('');

    customErrorHandler.handleError(mockError3);
    expect(customErrorHandler['errorMessage']).toBe(
      'Transazione annullata da MetaMask'
    );
  });

  it('should set errorMessage correctly for additional error messages', () => {
    const mockError1 = {
      message:
        "Request of type 'wallet_requestPermissions' already pending for origin",
    };
    const mockError2 = {
      message: 'Richiesta già in corso, controlla MetaMask',
    };

    customErrorHandler.handleError(mockError1);
    expect(customErrorHandler['errorMessage']).toBe(
      'Richiesta già in corso, controlla MetaMask'
    );

    const initialErrorMessage = customErrorHandler['errorMessage'];
    customErrorHandler.handleError(mockError2);
    expect(customErrorHandler['errorMessage']).toBe(initialErrorMessage);
  });

  it('should open a snackbar when errorMessage is not empty', () => {
    const mockError = {
      message: 'Start must be less than the length of the array',
    };
    spyOn(customErrorHandler['snackBar'], 'open');

    customErrorHandler.handleError(mockError);
    expect(customErrorHandler['snackBar'].open).toHaveBeenCalledWith(
      'Nessuna recensione trovata da caricare',
      'Close',
      {
        duration: 5000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      }
    );
  });

  it('should not open a snackbar when errorMessage is empty', () => {
    const mockError = { message: 'You have not released any reviews' };
    spyOn(customErrorHandler['snackBar'], 'open');

    customErrorHandler.handleError(mockError);
    expect(customErrorHandler['snackBar'].open).not.toHaveBeenCalled();
  });

  it('should set errorMessage correctly for "The requested account and/or method has not been authorized by the user"', () => {
    const mockError = {
      message:
        'The requested account and/or method has not been authorized by the user',
    };
    customErrorHandler.handleError(mockError);
    expect(customErrorHandler['errorMessage']).toBe(
      "Errore: l'account MetaMask non è autorizzato a eseguire questa operazione"
    );
  });

  it('should set errorMessage correctly for "User rejected the request"', () => {
    const mockError = {
      message: 'User rejected the request',
    };
    customErrorHandler.handleError(mockError);
    expect(customErrorHandler['errorMessage']).toBe(
      'Richiesta annullata da MetaMask'
    );
  });

  it('should open a snackbar with the provided message', () => {
    const mockMessage = 'Test message';
    spyOn(customErrorHandler['snackBar'], 'open');

    customErrorHandler.displayMessage(mockMessage);

    expect(customErrorHandler['snackBar'].open).toHaveBeenCalledWith(
      mockMessage,
      'Close',
      { duration: 5000 }
    );
  });
});
