import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {
  form: FormGroup = new FormGroup({});
  accountBalance: number = 0;
  constructor(private formBuilder: FormBuilder, private web3: Web3Service) {
    this.getTokenBalance();
  }

  async pay(address: string, amount: string) {
    this.web3.ApproveTokens(parseInt(amount));
    this.web3.DepositTokens(address, parseInt(amount));
  }
  async getToken() {
    this.web3.pullTCoin();
  }

  async getTokenBalance() {
    let balance = await this.web3.getTokenBalance();
    this.accountBalance = balance;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.pattern("^0x[a-fA-F0-9]{40}$")]],
      tokens: [null, [Validators.required, Validators.pattern(/^[1-9]\d*$/)]]
    });
  }

  onSubmit(form: any): void {
    this.pay(form.address, form.tokens);
  }
}
