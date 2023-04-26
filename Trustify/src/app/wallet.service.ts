import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private hasDisconnected: boolean = false;

  changeDisconnectedState(newState: boolean): void {
    this.hasDisconnected = newState;
  }

  constructor(
    //private errorHandler: ErrorHandlerService,
    private window: WindowRefService
  ) {}

  isInstalled(): boolean {
    return this.window.nativeWindow.ethereum;
  }

  async isConnected() {
    if (this.isInstalled()) {
      const accounts = await this.window.nativeWindow.ethereum.request({
        method: 'eth_accounts',
      });
      if (accounts.length) {
        return true;
      } else {
        throw new Error('Metamask is not connected');
        //return false;
      }
    } else {
      throw new Error('Metamask is not installed');
      //return false;
    }
  }

  async gestisciBottone() {
    if (!this.hasDisconnected) {
      //è la prima volta che ti connetti
      await this.window.nativeWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });
    } else {
      // ti sei precedentemente disconnesso
      await this.window.nativeWindow.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
    }
  }

  async ConnectToMetamask() {
    if (this.isInstalled()) {
      try {
        await this.window.nativeWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (err: any) {
        if (err.code === 4001) {
          console.log('Please select an account');
        } else {
          console.log(err);
        }
        return false;
      }
      console.log('connected');
      return true;
    } else {
      console.log('Metamask is not installed');
      return false;
    }
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
                  'https://sepolia.infura.io/v3/070cc0651bb440b290dc3da7594140a6', //forse da cambiare
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
    if (await this.ConnectToMetamask()) {
      await this.SwitchNetwork();
      return this.window.nativeWindow.ethereum;
    }
    return null;
  }
}
