import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private address!: string;
  private readonly infuraHTTPProvider: string = 'HTTP://127.0.0.1:8545';
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

  async connectToMetamask() {
    if (this.isInstalled()) {
      try {
        const accounts = await this.window.nativeWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });
        this.address = accounts[0];
        this.web3.setProvider(await this.window.nativeWindow.ethereum); //Setting metamask as provider for web3
      } catch (error) {
        console.log(error);
        sessionStorage.setItem('isMetamaskConnected', 'false');
        throw new Error('Error while connecting with Metamask');
      }
      console.log('connected with metamask! with address: ' + this.address);
      this.isConnected = true;
    } else {
      console.log('Metamask is not installed');
      throw new Error('Metamask is not installed');
    }
  }

  async switchNetwork() {
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
                chainName: 'sepolia test network',
                rpcUrls: [
                  this.infuraHTTPProvider, //forse da cambiare
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

  // da rimuovere i return
  async connect() {
    await this.connectToMetamask();
    //await this.switchNetwork();
  }
}
