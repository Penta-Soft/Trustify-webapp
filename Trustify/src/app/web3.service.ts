import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private contractAddress = '0x45d66c4f3B299a56Ddb4283851BaC8dA52a0e477';
  private contractAddressTC = '0xA73b3971D222DCd80B36EF8A4ea234666f205B39';

  private abi = require('../../contracts/Trustify.json');
  private abiTC = require('../../contracts/TCoin.json');

  private contract = new this.web3.eth.Contract(
    this.abi.abi,
    this.contractAddress
  );
  private contractTC = new this.web3.eth.Contract(
    this.abiTC.abi,
    this.contractAddressTC
  );

  private address = async () => await this.walletService.getAccount();

  constructor(private walletService: WalletService, private web3: Web3) {
    web3.setProvider(this.walletService.getProvider()); //setting up provider for read-only functions
  }

  async refreshConnectWallet() {
    if (await this.walletService.getAccount()) {
      await this.walletService.connect();
    }
  }

  public async getBalance() {
    const balance = await this.web3.eth.getBalance(await this.address());
    return Web3.utils.fromWei(balance);
  }

  async pullTCoin() {
    await this.contractTC.methods.drip().send({ from: await this.address() });
  }

  async getTokenBalance(): Promise<number> {
    if (await this.walletService.isWalletConnected()) {
      let balance = await this.contractTC.methods
        .balanceOf(await this.address())
        .call({ from: await this.address() });
      balance = Web3.utils.fromWei(balance);
      return balance;
    } else return 0;
  }

  async approveTokens(amount: number) {
    if (await this.walletService.isWalletConnected()) {
      let allowance = await this.contractTC.methods
        .allowance(await this.address(), this.contractAddress)
        .call();

      if (parseInt(allowance) < amount) {
        await this.contractTC.methods
          .approve(
            this.contractAddress,
            Web3.utils.toWei(amount.toString(), 'ether')
          )
          .send({ from: await this.address() })
          .on('transactionHash', function (hash: any) {
            console.log(hash);
          })
          .on('receipt', function (receipt: any) {
            console.log(receipt + 'Done!');
          })
          .on('error', console.error);
      }
    } else console.log('wallet not connected, approve tokens failed');
  }

  async depositTokens(address: string, amount: number) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .depositTokens(address, Web3.utils.toWei(amount.toString(), 'ether'))
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Token deposited!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, deposit tokens failed');
  }

  async writeAReview(address: string, review: string, stars: number) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .writeAReview(address, review, stars)
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Write a review done!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, write a review failed');
  }

  async getCompanyReview(from: number, to: number, address: string) {
    let output;
    try {
      output = await this.contract.methods
        .getCompanyReview(from, to, address)
        .call();
    } catch (e) {
      throw new Error(
        'getCompanyReview: this address does not have any reviews'
      );
    }
    return output;
  }

  async getSpecificReview(address: string) {
    let review: string;
    let star: number;
    [review, star] = await this.contract.methods
      .getSpecificReview(address)
      .call();
    return [review, star];
  }

  async getMyReview(from: number, to: number) {
    if (await this.walletService.isWalletConnected()) {
      let output;
      try {
        output = await this.contract.methods
          .getMyReview(from, to)
          .call({ from: await this.address() });
      } catch (e) {
        throw new Error('getMyReview: this address does not have any reviews');
      }
      return output;
    } else console.log('wallet not connected, get my review failed');
  }

  async deleteReview(address: string) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .deleteReview(address)
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Delete review done!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, delete review failed');
  }

  //Ritorna un array con tutte le "stars"
  async getAverageStarsArray(address: string) {
    let stars: number[];
    stars = await this.contract.methods.GetAverageStars(address).call();
    return stars;
  }

  //Ritorna la media effettiva di tutte le "stars"
  async getAverageStars(address: string) {
    let array: number[];
    array = await this.getAverageStarsArray(address);
    return array.reduce((a, b) => a + b, 0) / array.length;
  }
}
