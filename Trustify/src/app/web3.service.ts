import { Injectable, Provider } from '@angular/core';
import { WalletService } from './wallet.service';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private contractAddress = '0x180Ab83BB942aAA961A726492897Fd4EcBaDA80E'; //address del contratto
  //https://sepolia.etherscan.io/address/0xE45855601095597163f2081d8d1bc26cc283d202
  private contractAddressTC = '0x536883262c847523aa8342b46c9a39f791dEEb3D';
  //https://sepolia.etherscan.io/address/0xDE3160A2B9feE2a47DF91Ce47DA53065EEfa25b1

  private address = async () => await this.walletService.getAccount();
  private walletConnected = async () =>
    await this.walletService.isWalletConnected();
  private readonly infuraHTTPProvider: string =
    'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb';
  private abi = require('../../contracts/Trustify.json');
  private abiTC = require('../../contracts/TCoin.json');

  constructor(private walletService: WalletService, private web3: Web3) {
    web3.setProvider(this.infuraHTTPProvider);
  }

  public async getBalance() {
    const balance = await this.web3.eth.getBalance(await this.address());
    return Web3.utils.fromWei(balance);
  }

  async pullTCoin() {
    const contract = new this.web3.eth.Contract(
      this.abiTC.abi,
      this.contractAddressTC
    );
    await contract.methods.drip().send({ from: await this.address() });
  }

  async getTokenBalance(): Promise<number> {
    const contract = new this.web3.eth.Contract(
      this.abiTC.abi,
      this.contractAddressTC
    );
    let balance = await contract.methods
      .balanceOf(await this.address())
      .call({ from: await this.address() });
    balance = Web3.utils.fromWei(balance);
    return balance;
  }

  async ApproveTokens(amount: number) {
    if (await await this.address()) {
      const contractTC = new this.web3.eth.Contract(
        this.abiTC.abi,
        this.contractAddressTC
      );
      const contract = new this.web3.eth.Contract(
        this.abi.abi,
        this.contractAddress
      );
      let allowance = Web3.utils.fromWei(
        await contract.methods
          .CheckAllowance()
          .call({ from: await this.address() })
      );

      if (parseInt(allowance) < amount) {
        await contractTC.methods
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
    if (await this.address()) {
      const contract = new this.web3.eth.Contract(
        this.abi.abi,
        this.contractAddress
      );
      await contract.methods
        .DepositTokens(address, Web3.utils.toWei(amount.toString(), 'ether'))
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Done!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, deposit tokens failed');
  }

  async WriteAReview(address: string, review: string, stars: number) {
    if (await this.address()) {
      const contract = new this.web3.eth.Contract(
        this.abi.abi,
        this.contractAddress
      );
      await contract.methods
        .WriteAReview(address, review, stars)
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Done!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, write a review failed');
  }

  async GetNCompanyReview(from: number, to: number, address: string) {
    const contract = new this.web3.eth.Contract(
      this.abi.abi,
      this.contractAddress
    );
    let output = await contract.methods
      .GetCompanyReview(from, to, address)
      .call();
    return output;
  }

  async GetSpecificReview(address: string) {
    const contract = new this.web3.eth.Contract(
      this.abi.abi,
      this.contractAddress
    );
    let review: string;
    let star: number;
    [review, star] = await contract.methods.GetSpecificReview(address).call();
    return [review, star];
  }

  async GetNMyReview(from: number, to: number) {
    if (await this.address()) {
      const contract = new this.web3.eth.Contract(
        this.abi.abi,
        this.contractAddress
      );

      let output = await contract.methods
        .GetMyReview(from, to)
        .call({ from: await this.address() });
      console.log(output);
      return output;
    } else console.log('wallet not connected, get my review failed');
  }

  async DeleteReview(address: string) {
    if (await this.address()) {
      const contract = new this.web3.eth.Contract(
        this.abi.abi,
        this.contractAddress
      );
      await contract.methods
        .DeleteReview(address)
        .send({ from: await this.address() })
        .on('transactionHash', function (hash: any) {
          console.log(hash);
        })
        .on('receipt', function (receipt: any) {
          console.log(receipt + 'Done!');
        })
        .on('error', console.error);
    } else console.log('wallet not connected, delete review failed');
  }

  //Ritorna un array con tutte le "stars"
  async GetAverageStarsArray(address: string) {
    const contract = new this.web3.eth.Contract(
      this.abi.abi,
      this.contractAddress
    );
    let stars: number[];
    stars = await contract.methods.GetAverageStars(address).call();
    return stars;
  }

  //Ritorna la media effettiva di tutte le "stars"
  async GetAverageStars(address: string) {
    let array: number[];
    array = await this.GetAverageStarsArray(address);
    /*let sum=0;
    for(let i=0;i<array.length;i++){
      sum+=array[i];
    }
    return sum/array.length;*/
    return array.reduce((a, b) => a + b, 0) / array.length; //dovrebbe calcolare la media direttamente così
  }
}
