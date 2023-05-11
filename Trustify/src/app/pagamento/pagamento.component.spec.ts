import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagamentoComponent } from './pagamento.component';
import { Web3Service } from '../web3.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Rx from 'rxjs';
import { By } from '@angular/platform-browser';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let web3ServiceSpy: any;

  beforeEach(async () => {

    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['approveTokens', 'depositTokens', 'pullTCoin', 'getTokenBalance']);

    await TestBed.configureTestingModule({
      declarations: [PagamentoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy }],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call component getTokenBalance() on component initialize', () => {
    spyOn(component, 'getTokenBalance');;
    fixture.detectChanges();
    expect(component.getTokenBalance).toHaveBeenCalled();
  })

  it('should call web3 getTokenBalance() on component getTokenBalance() call', fakeAsync(() => {
    let testBalance = 10;
    let getTokenBalanceSpy = web3ServiceSpy.getTokenBalance.and.returnValue(Rx.of(testBalance));

    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(getTokenBalanceSpy).toHaveBeenCalled();
    expect(getTokenBalanceSpy.calls.any()).toBe(true);
    expect(component.balance).toBeDefined();
  }))

  it('should call component pay() after form submit', waitForAsync(() => {
    const addressControl = component.form.get('address');
    const tokenControl = component.form.get('token');
    const formElement = fixture.debugElement.query(By.css('#payment'));
    const submitFunction = spyOn(component, 'pay');

    addressControl?.setValue('0x96A85348653DfAd720fFa6193dE5c9792BB65C5e');
    tokenControl?.setValue(10);
    fixture.detectChanges();
    formElement.triggerEventHandler('submit', {});
    fixture.detectChanges();

    expect(submitFunction).toHaveBeenCalled();
  }))
});
