import { Component } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {
  constructor(private web3: Web3Service) {}

  async pay(address: string, amount: string){
    this.web3.ApproveTokens(parseInt(amount));
    this.web3.DepositTokens(address,parseInt(amount));
  }
  async getToken(){
    this.web3.pullTCoin();
  }

}
