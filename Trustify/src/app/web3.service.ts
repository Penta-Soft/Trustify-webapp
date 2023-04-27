import { Injectable, Provider } from '@angular/core';
import { WalletService } from './wallet.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private contractAddress = '0x180Ab83BB942aAA961A726492897Fd4EcBaDA80E';
  private contractAddressTC = '0x536883262c847523aa8342b46c9a39f791dEEb3D';

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

  public async getBalance() {
    const balance = await this.web3.eth.getBalance(await this.address());
    return Web3.utils.fromWei(balance);
  }

  async pullTCoin() {
    await this.contract.methods.drip().send({ from: await this.address() });
  }

  async getTokenBalance(): Promise<number> {
    let balance = await this.contractTC.methods
      .balanceOf(await this.address())
      .call({ from: await this.address() });
    balance = Web3.utils.fromWei(balance);
    return balance;
  }

  async ApproveTokens(amount: number) {
    if (await this.walletService.isWalletConnected()) {
      let allowance = Web3.utils.fromWei(
        await this.contract.methods
          .CheckAllowance()
          .call({ from: await this.address() })
      );

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

  async DepositTokens(address: string, amount: number) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .DepositTokens(address, Web3.utils.toWei(amount.toString(), 'ether'))
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

  async WriteAReview(address: string, review: string, stars: number) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .WriteAReview(address, review, stars)
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

  async GetCompanyReview(from: number, to: number, address: string) {
    let output = await this.contract.methods
      .GetCompanyReview(from, to, address)
      .call();
    return output;
  }

  async GetSpecificReview(address: string) {
    let review: string;
    let star: number;
    [review, star] = await this.contract.methods
      .GetSpecificReview(address)
      .call();
    return [review, star];
  }

  async GetMyReview(from: number, to: number) {
    if (await this.walletService.isWalletConnected()) {
      let output = await this.contract.methods
        .GetMyReview(from, to)
        .call({ from: await this.address() });
      console.log(output);
      return output;
    } else console.log('wallet not connected, get my review failed');
  }

  async DeleteReview(address: string) {
    if (await this.walletService.isWalletConnected()) {
      await this.contract.methods
        .DeleteReview(address)
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
  async GetAverageStarsArray(address: string) {
    let stars: number[];
    stars = await this.contract.methods.GetAverageStars(address).call();
    return stars;
  }

  //Ritorna la media effettiva di tutte le "stars"
  async GetAverageStars(address: string) {
    let array: number[];
    array = await this.GetAverageStarsArray(address);
    return array.reduce((a, b) => a + b, 0) / array.length;
  }
}
