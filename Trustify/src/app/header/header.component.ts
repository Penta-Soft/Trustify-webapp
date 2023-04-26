import { Component } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private WalletService: WalletService) { }
  firstPage: number = 0;
  isMetamaskConnected: boolean = false;

  changeMetamaskState(): void {
    if (this.isMetamaskConnected === false) {
      this.WalletService.gestisciBottone();
    }
    else if (this.isMetamaskConnected === true) {
      this.WalletService.changeDisconnectedState(this.isMetamaskConnected);
    }
    this.isMetamaskConnected = !this.isMetamaskConnected;
    this.firstPage = 0;
  }

}
