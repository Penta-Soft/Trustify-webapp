import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private address: string = 'notAVaildAddress';
  private isConnected: boolean = false;

  constructor(private window: WindowRefService, private web3: Web3) {}

  isInstalled(): boolean {
    return this.window.nativeWindow.ethereum;
  }

  isWalletConnected(): boolean {
    return this.isConnected;
  }

  async ConnectToMetamask() {
    if (this.isInstalled()) {
      try {
        const accounts = await this.window.nativeWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });
        this.address = accounts[0];
        this.web3.setProvider(await this.window.nativeWindow.ethereum);
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
