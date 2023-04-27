import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  firstPage: number = 0;
  isMetamaskConnected: boolean = false;

  async ngOnInit() {
    if (localStorage.getItem('isMetamaskConnected') == 'true') {
      await this.walletService.Connect();
      if (await this.walletService.getAccount()) {
        this.isMetamaskConnected = true;
      } else {
        this.isMetamaskConnected = false;
      }
    }
  }

  constructor(private walletService: WalletService) {}

  async changeMetamaskState() {
    if (!this.isMetamaskConnected) {
      if (await this.walletService.Connect()) {
        localStorage.setItem('isMetamaskConnected', 'true');
        this.isMetamaskConnected = true;
      }
    }

    //this.firstPage = 0;
  }
}
