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
  currentIndex: number = 0;

  async ngOnInit() {
    if (sessionStorage.getItem('isMetamaskConnected') == 'true') {
      if (await this.walletService.connect()) {
        this.isMetamaskConnected = true;
      } else {
        this.isMetamaskConnected = false;
      }
    }
    let index = sessionStorage.getItem('index');
    this.currentIndex = index !== null ? parseInt(index) : 0;
  }

  constructor(private walletService: WalletService) {}

  updateCurrentIndex(index: number): void {
    this.currentIndex = index;
    sessionStorage.setItem('index', index.toString());
  }

  async changeMetamaskState() {
    if (!this.isMetamaskConnected) {
      if (await this.walletService.connect()) {
        sessionStorage.setItem('isMetamaskConnected', 'true');
        this.isMetamaskConnected = true;
      }
    }
    this.currentIndex = 0;
  }
}
