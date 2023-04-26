import { Component } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  firstPage: number = 0;
  isMetamaskConnected: boolean = false;

  constructor(private WalletService: WalletService) {
    //this.isMetamaskConnected = localStorage.getItem('isMetamaskConnected') == 'true' ? true : false;
  }

  changeMetamaskState(): void {
    this.isMetamaskConnected = !this.isMetamaskConnected;
    this.firstPage = 0;
  }
}
