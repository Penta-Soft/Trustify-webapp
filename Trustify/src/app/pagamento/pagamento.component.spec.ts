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
import * as Rx from 'rxjs';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let web3ServiceSpy: any;
  let approveTokensSpy: any;
  let depositTokensSpy: any;

  beforeEach(async () => {
    web3ServiceSpy = jasmine.createSpyObj('Web3Service', [
      'approveTokens',
      'depositTokens',
      'pullTCoin',
      'getTokenBalance',
    ]);

    approveTokensSpy = web3ServiceSpy.approveTokens.and.returnValue(Promise.resolve(true));
    depositTokensSpy = web3ServiceSpy.depositTokens.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      declarations: [PagamentoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy }],
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
    flush();
  }));

  it('RFO7.1 - user should be able to see the error message if the connection is lost', () => {

  });

  it('RFO7.2 - user should be able to enter the address of the wallet intended to receive the payment', () => {

  });

  it('RFO7.2.1 - user should be able to see the error message if the address is empty', () => {

  });

  it('RFO7.2.2 - user should be able to see the error message if the address is invalid', () => {

  });

  it('RFO7.3 - user should be able to enter the amount of ERC20 token to send', () => {

  });

  it('RFO7.3.1 - user should be able to see the error message is the token amount is empty', () => {

  })

  it('RFO7.3.2 - user should be able to see the error message is the token amount is invalid', () => {

  })

  it('should call component getTokenBalance() on component initialize', () => {
    spyOn(component, 'getTokenBalance');
    fixture.detectChanges();
    expect(component.getTokenBalance).toHaveBeenCalled();
  });

  it('should call web3 getTokenBalance() on component getTokenBalance() call', fakeAsync(() => {
    let testBalance = 10;
    let getTokenBalanceSpy = web3ServiceSpy.getTokenBalance.and.returnValue(
      Rx.of(testBalance)
    );

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getTokenBalanceSpy).toHaveBeenCalled();
    expect(getTokenBalanceSpy.calls.any()).toBe(true);
    expect(component.balance).toBeDefined();
  }));
});
