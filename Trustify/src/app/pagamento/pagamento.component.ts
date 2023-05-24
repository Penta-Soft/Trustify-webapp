import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';
import { CustomErrorHandler } from '../custom-error-interceptor';
@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent {
  form: FormGroup = new FormGroup({});
  balance: number = 0;
  isProgressSpinnerVisible: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private web3: Web3Service,
    private customError: CustomErrorHandler
  ) {
    this.getTokenBalance();
  }

  async pay(address: string, amount: string) {
    this.isProgressSpinnerVisible = true;
    await this.web3.approveTokens(parseInt(amount)).finally(async () => {
      try {
        await this.web3.depositTokens(address, parseInt(amount)).finally(() => {
          this.isProgressSpinnerVisible = false;
          this.customError.displayMessage('Pagamento effettuato con successo!');
        });
      } catch (error: any) {
        this.isProgressSpinnerVisible = false;
        this.customError.handleError(error);
      }
    });
  }

  async getToken() {
    try {
      this.isProgressSpinnerVisible = true;
      await this.web3.pullTCoin().finally(() => {
        this.customError.displayMessage('Token ricevuti con successo!');
      });
    } catch (error: any) {
      this.customError.handleError(error);
    }
    this.isProgressSpinnerVisible = false;
  }

  async getTokenBalance() {
    this.balance = await this.web3.getTokenBalance();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
      tokens: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
    });

    this.getTokenBalance();
  }

  onSubmit(form: any): void {
    this.pay(form.value.address, form.value.tokens);
  }
}
