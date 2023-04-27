import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //private firstPage: number = 0;
  private isMetamaskConnected: boolean = false;

  async ngOnInit() {
    if (localStorage.getItem('isMetamaskConnected') == 'true') {
      if (await this.walletService.Connect()) {
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

    //this.firstPage = 0; //cazzo serve sta roba?
  }
}
