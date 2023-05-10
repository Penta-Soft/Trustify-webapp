import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  firstPage: number = 0;
  isMetamaskConnected: boolean = false;
  currentIndex: number = 0;

  async connectToMetamask() {
    try {
      await this.walletService.connect().finally(() => {
        this.isMetamaskConnected = true;
        sessionStorage.setItem('isMetamaskConnected', 'true');
        this.snackBar.open('Connesso con Metamask', 'Close', {
          duration: 4000,
        });
      });
    } catch (e: any) {
      this.snackBar.open(e.message, 'Close', {
        duration: 10000,
      });
      this.isMetamaskConnected = false;
      sessionStorage.setItem('isMetamaskConnected', 'false');
    }
  }

  async ngOnInit() {
    if (sessionStorage.getItem('isMetamaskConnected') == 'true') {
      await this.connectToMetamask();
    }
    let index = sessionStorage.getItem('index');
    this.currentIndex = index !== null ? parseInt(index) : 0;
  }

  constructor(
    private walletService: WalletService,
    private snackBar: MatSnackBar
  ) {}

  updateCurrentIndex(index: number): void {
    this.currentIndex = index;
    sessionStorage.setItem('index', index.toString());
  }

  async changeMetamaskState() {
    if (!this.isMetamaskConnected) {
      await this.connectToMetamask();
    }
    this.currentIndex = 0;
  }
}
