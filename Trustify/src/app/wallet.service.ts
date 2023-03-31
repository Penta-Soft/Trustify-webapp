import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private m_windowRef: WindowRefService;

  constructor() {
    this.m_windowRef = new WindowRefService();
  }

  async isConnected() {
    const accounts = await this.m_windowRef.nativeWindow.ethereum.request({
      method: 'eth_accounts',
    });
    if (accounts.length) {
      return true;
    } else {
      console.log('Metamask is not connected');
      return false;
    }
  }

  async ConnectToMetamask() {
    if (this.m_windowRef.nativeWindow.ethereum) {
      try {
        await this.m_windowRef.nativeWindow.ethereum.request({
          method: 'eth_requestAccounts',
        });
      } catch (err : any) {
        if (err.code === 4001) {
          console.log('Please select an account');
        } else {
          console.log(err);
        }
        return false;
      }
      console.log('connected');
      return true;
    }
    console.log('Cannot detect browser support');
    return false;
  }

  async SwitchNetwork() {
    try {
      await this.m_windowRef.nativeWindow.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xAA36A7' }],
      });
    } catch (switchError : any) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await this.m_windowRef.nativeWindow.ethereum.request({
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
      return this.m_windowRef.nativeWindow.ethereum;
    }
    return null;
  }
}
