import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagamentoComponent } from './pagamento.component';
import { Web3Service } from '../web3.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';
import { CustomErrorHandler } from '../custom-error-interceptor';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let web3ServiceSpy: any;
  let approveTokensSpy: any;
  let depositTokensSpy: any;
  let handleErrorSpy: any;

  beforeEach(async () => {
    const customErrorService = jasmine.createSpyObj('CustomErrorHandler', ['handleError']);
    web3ServiceSpy = jasmine.createSpyObj('Web3Service', [
      'approveTokens',
      'depositTokens',
      'pullTCoin',
      'getTokenBalance',
    ]);

    approveTokensSpy = web3ServiceSpy.approveTokens.and.returnValue(Promise.resolve(true));
    depositTokensSpy = web3ServiceSpy.depositTokens.and.returnValue(Promise.resolve(true));
    handleErrorSpy = customErrorService.handleError.and.returnValue('Connessione persa!');

    await TestBed.configureTestingModule({
      declarations: [PagamentoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy },
      { provide: CustomErrorHandler, useValue: customErrorService }],
      imports: [FormsModule, ReactiveFormsModule, MatSnackBarModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RFO7 - user should be able to make a payment from his wallet calling component pay', () => {
    fixture.detectChanges();
    const paySpy = spyOn(component, 'pay');
    const addressControl = component.form.controls['address'];
    const tokenControl = component.form.controls['tokens'];
    addressControl.setValue('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
    tokenControl.setValue('10');

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#btn-submit'));
    (submitButton.nativeElement as HTMLButtonElement).click();

    expect(paySpy).toHaveBeenCalled();
  });

  it('RFO7 - user should be able to make a payment from his wallet calling web3 approveTokens and depositTokens', fakeAsync(() => {
    component.pay('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e', '10');

    tick();

    fixture.detectChanges();
    expect(approveTokensSpy).toHaveBeenCalled();
    expect(depositTokensSpy).toHaveBeenCalled();
    flush();
  }));

  it('RFO7.1 - user should be able to see the error message if the connection is lost', fakeAsync(() => {
    fixture.detectChanges();
    depositTokensSpy = web3ServiceSpy.depositTokens.and.returnValue(throwError(() => new Error('Connection lost')));

    component.pay('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e', '10');
    fixture.detectChanges();

    tick();

    expect(handleErrorSpy).toHaveBeenCalled();
    flush();
  }));

  it('RFO7.2 - user should be able to enter the address of the wallet intended to receive the payment', () => {
    fixture.detectChanges();

    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');

    fixture.detectChanges();

    expect(component.form.value.address).toEqual('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
  });

  it('RFO7.2.1 - user should be able to see the error message if the address is empty', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('');
    fixture.detectChanges();

    const addressErrorElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(addressErrorElement.nativeElement).toBeTruthy();
    expect(addressErrorElement.nativeElement.textContent).toEqual(
      'Inserire un indirizzo'
    );
  });

  it('RFO7.2.2 - user should be able to see the error message if the address is invalid', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x invalidAddress');
    fixture.detectChanges();

    const addressErrorElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(addressErrorElement.nativeElement).toBeTruthy();
    expect(addressErrorElement.nativeElement.textContent).toEqual(
      "L'indirizzo non rispetta il formato corretto"
    );
  });

  it('RFO7.3 - user should be able to enter the amount of ERC20 token to send', () => {
    fixture.detectChanges();
    const tokensControl = component.form.controls['tokens'];
    tokensControl.setValue('99');

    expect(component.form.value.tokens).toEqual('99');
  });

  it('RFO7.3.1 - user should be able to see the error message is the token amount is empty', () => {
    fixture.detectChanges();
    const tokensControl = component.form.controls['tokens'];
    tokensControl.setValue('');
    fixture.detectChanges();

    const tokensErrorElement = fixture.debugElement.query(By.css('.tErrorMsg'));
    expect(tokensErrorElement.nativeElement).toBeTruthy();
    expect(tokensErrorElement.nativeElement.textContent).toEqual(
      ' Inserire un importo di token'
    );
  })

  it('RFO7.3.2 - user should be able to see the error message is the token amount is invalid', () => {
    fixture.detectChanges();
    const tokensControl = component.form.controls['tokens'];
    tokensControl.setValue('-1');
    fixture.detectChanges();

    const tokensErrorElement = fixture.debugElement.query(By.css('.tErrorMsg'));
    expect(tokensErrorElement.nativeElement).toBeTruthy();
    expect(tokensErrorElement.nativeElement.textContent).toEqual(
      ' L\'importo dev\'essere un intero maggiore di zero '
    );
  })

  // test non tracciati

  it('should call component getTokenBalance() on component initialize', () => {
    spyOn(component, 'getTokenBalance');
    fixture.detectChanges();
    expect(component.getTokenBalance).toHaveBeenCalled();
  });

  it('should call web3 getTokenBalance() on component getTokenBalance() call', fakeAsync(() => {
    let testBalance = 10;
    let getTokenBalanceSpy = web3ServiceSpy.getTokenBalance.and.returnValue(
      testBalance
    );

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getTokenBalanceSpy).toHaveBeenCalled();
    expect(getTokenBalanceSpy.calls.any()).toBe(true);
    expect(component.balance).toBeDefined();
  }));
});
