import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private hasDisconnected: boolean = false;
  private address: string = 'notAVaildAddress';
  private isConnected: boolean = false;

  changeDisconnectedState(newState: boolean): void {
    this.hasDisconnected = newState;
  }

  constructor(private window: WindowRefService) {}

  isInstalled(): boolean {
    return this.window.nativeWindow.ethereum;
  }

  isWalletConnected(): boolean {
    return this.isConnected;
  }

  async gestisciBottone() {
    if (!this.hasDisconnected) {
      //è la prima volta che ti connetti
      await this.window.nativeWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });
    }
  }

  async ConnectToMetamask() {
    if (this.isInstalled()) {
      try {
        const accounts = await this.window.nativeWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });
        this.address = accounts[0];
      } catch (error) {
        console.log(error);
      }
      console.log('connected to metamask! with address: ' + this.address);
      this.isConnected = true;
      return true;
    } else {
      console.log('Metamask is not installed');
      return false;
    }
  }

  async getAccount() {
    return this.address;
  }

  async SwitchNetwork() {
    try {
      await this.window.nativeWindow.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }],
      });
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await this.window.nativeWindow.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xAA36A7',
                chainName: 'sepolia',
                rpcUrls: [
                  'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb', //forse da cambiare
                ],
              },
            ],
          });
        } catch (addError) {
          console.log('Cannot add ETH chain sepolia');
        }
      }
    }
  }

  async Connect() {
    await this.ConnectToMetamask();
    await this.SwitchNetwork();
  }
}
