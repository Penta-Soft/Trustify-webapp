import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private trustifyContractAddress =
    '0x396C5aE78b9a3132D72358A93772231B791d4e01';
  private tCoinContractAddress = '0x9C390b3373EA845C2dadB4b0f4a4e757493FC671';

  private trustifyAbi = require('../../contracts/Trustify.json');
  private tCoinAbi = require('../../contracts/TCoin.json');

  private trustifyContract = new this.web3.eth.Contract(
    this.trustifyAbi.abi,
    this.trustifyContractAddress
  );
  private tCoinContract = new this.web3.eth.Contract(
    this.tCoinAbi.abi,
    this.tCoinContractAddress
  );

  private address = async () => await this.walletService.getAccount();

  constructor(private walletService: WalletService, private web3: Web3) {
    web3.setProvider(this.walletService.getProvider()); //setting up provider for read-only functions
  }

  async pullTCoin() {
    await this.tCoinContract.methods
      .drip()
      .send({ from: await this.address() });
  }

  async getTokenBalance(): Promise<number> {
    if (await this.walletService.isWalletConnected()) {
      let balance = await this.tCoinContract.methods
        .balanceOf(await this.address())
        .call({ from: await this.address() });
      balance = Web3.utils.fromWei(balance);
      return balance;
    } else return 0;
  }

  async approveTokens(amount: number) {
    if (await this.walletService.isWalletConnected()) {
      let allowance = await this.tCoinContract.methods
        .allowance(await this.address(), this.trustifyContractAddress)
        .call();

      if (parseInt(allowance) < amount) {
        await this.tCoinContract.methods
          .approve(
            this.trustifyContractAddress,
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
    } else {
      console.log('wallet non connesso, approve tokens fallito');
      throw new Error('wallet non connesso, approve tokens fallito');
    }
  }

  async depositTokens(address: string, amount: number) {
    if (await this.walletService.isWalletConnected()) {
      await this.trustifyContract.methods
        .depositTokens(address, Web3.utils.toWei(amount.toString(), 'ether'))
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Token deposited!');
        })
        .on('error', console.error);
    } else {
      console.log('wallet non connesso, deposit tokens fallito');
      throw new Error('wallet non connesso, deposit tokens fallito');
    }
  }

  async writeAReview(address: string, review: string, stars: number) {
    if (await this.walletService.isWalletConnected()) {
      if (
        await this.trustifyContract.methods
          .havePayed(await this.address(), address)
          .call()
      ) {
        await this.trustifyContract.methods
          .writeAReview(address, review, stars)
          .send({ from: await this.address() })
          .on('transactionHash', function (hash: any) {
            console.log(hash);
          })
          .on('receipt', function (receipt: any) {
            console.log(receipt + 'Write a review done!');
          })
          .on('error', console.error);
      } else {
        throw new Error(
          'Non hai effettuato una transazione per questa azienda'
        );
      }
    } else {
      console.log('wallet not connected, write a review failed');
      throw new Error('Wallet non connesso, impossibile scrivere una review');
    }
  }

  async getCompanyReview(from: number, to: number, address: string) {
    let output;
    output = await this.trustifyContract.methods
      .getCompanyReview(from, to, address)
      .call();
    return output;
  }

  async getMyReview(from: number, to: number) {
    if (await this.walletService.isWalletConnected()) {
      let output;
      output = await this.trustifyContract.methods
        .getMyReview(from, to)
        .call({ from: await this.address() });
      return output;
    } else {
      console.log('Wallet non connesso, impossibile recuperare la tua review');
      throw new Error(
        'Wallet non connesso, impossibile recuperare la tua review'
      );
    }
  }

  async deleteReview(address: string) {
    if (await this.walletService.isWalletConnected()) {
      await this.trustifyContract.methods
        .deleteReview(address)
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Delete review done!');
        })
        .on('error', console.error);
    } else {
      console.log('Wallet non connesso, impossibile cancellare la tua review');
      throw new Error(
        'Wallet non connesso, impossibile cancellare la tua review'
      );
    }
  }
}
