import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private address!: string;
  private readonly infuraHTTPProvider: string =
    'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb';
  private isConnected: boolean = false;

  constructor(private window: WindowRefService, private web3: Web3) {}

  getProvider() {
    return this.infuraHTTPProvider;
  }

  async getAccount() {
    return this.address;
  }

  isInstalled(): boolean {
    return this.window.nativeWindow.ethereum;
  }

  async isWalletConnected() {
    return this.isConnected;
  }

  private async connectToMetamask() {
    if (this.isInstalled()) {
      const accounts = await this.window.nativeWindow.ethereum.request({
        method: 'eth_requestAccounts',
      });
      this.address = accounts[0];
      this.web3.setProvider(await this.window.nativeWindow.ethereum); //Setting metamask as provider for web3
      console.log('Connected with metamask! with address: ' + this.address);
      this.isConnected = true;
    } else {
      console.log('Metamask is not installed');
      throw new Error('Metamask non è installato');
    }
  }

  private async switchNetwork() {
    try {
      await this.window.nativeWindow.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }],
      });
    } catch (switchError: any) {
      console.log("metamask doesn't support chain switching now");
      // This error code indicates that the chain has not been added to MetaMask.
      /*
      if (switchError.code === 4902) {
        try {
          await this.window.nativeWindow.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xAA36A7',
                chainName: 'sepolia test network',
                rpcUrls: [this.infuraHTTPProvider],
              },
            ],
          });
        } catch (addError) {
          console.log('Cannot add ETH chain sepolia');
        }
      }
      */
    }
  }

  async connect() {
    await this.connectToMetamask();
    await this.switchNetwork();
  }
}
