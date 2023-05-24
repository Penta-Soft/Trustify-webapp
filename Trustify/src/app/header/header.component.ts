import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { CustomErrorHandler } from '../custom-error-interceptor';
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
        this.errorHandler.displayMessage('Metamask connesso con successo!');
      });
    } catch (e: any) {
      this.errorHandler.handleError(e);
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
    private errorHandler: CustomErrorHandler
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
