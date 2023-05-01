import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PagamentoComponent } from './pagamento.component';
import { Web3Service } from '../web3.service';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;

  beforeEach(async () => {

    let web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['approveTokens', 'depositTokens', 'pullTCoin', 'getTokenBalance']);

    await TestBed.configureTestingModule({
      declarations: [PagamentoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
