import { Injectable, Provider } from '@angular/core';
import { WalletService } from './wallet.service';
import Web3 from 'web3';
import { provider } from 'web3-core';

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private contractAddress = "0x881037F2cC0A8eADCc3f3C991573b988F052fd91"; //da cambiare e mettere l'address del contratto
    private provider!: provider;
  private address!: string[];
  private web3WalletProvider: Web3; 
  private m_wallet: WalletService;
  private readonly infuraHTTPProvider: string =
    'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb';
  private walletConnected: boolean = false;

  constructor() {
    this.m_wallet = new WalletService();
    this.web3WalletProvider = new Web3(
      new Web3.providers.HttpProvider(this.infuraHTTPProvider)
    );

    this.IsWalletConnected();
  }

  public getAddress() {
    return this.address[0];
  }

  public async getBalance() {
    const balance = await this.web3WalletProvider.eth.getBalance(this.address[0]);
    return Web3.utils.fromWei(balance);
  }

  async IsWalletConnected() {
    this.walletConnected = await this.m_wallet.isConnected();
    if (this.walletConnected) {
      this.ConnectWallet();
    }
  }

  async ConnectWallet() {
    this.provider = await this.m_wallet.Connect();
    if (this.provider) {
      this.web3WalletProvider = new Web3(this.provider);
      this.address = await this.web3WalletProvider.eth.getAccounts();
      console.log(this.address[0]);

      const balance = await this.web3WalletProvider.eth.getBalance(
        this.address[0]
      );

      this.walletConnected = true;
      console.log(Web3.utils.fromWei(balance));
    }
  }

  async DepositTokens(address:string, amount:number){
    if (this.walletConnected) {
      let abi= require('contracts/Trustify.sol/Trustify.json')
      const contract = new this.web3WalletProvider.eth.Contract(abi.abi, this.contractAddress);
      await contract.methods.DepositTokens(
        address,
        amount
      ).send({from: this.address[0]})
      .on('transactionHash', function (hash: any) {
        console.log(hash);
      })
      .on('receipt', function (receipt: any) {
        console.log(receipt+"Done!");
      })
      .on('error', console.error)
    }else console.log("wallet not connected");    

  }

  async WriteAReview(address:string, review:string, stars:number){
    if (this.walletConnected) {
      let abi= require('contracts/Trustify.sol/Trustify.json')
      const contract = new this.web3WalletProvider.eth.Contract(abi.abi, this.contractAddress);
      await contract.methods.WriteAReview(
        address,
        review,
        stars
      ).send({from: this.address[0]})
      .on('transactionHash', function (hash: any) {
        console.log(hash);
      })
      .on('receipt', function (receipt: any) {
        console.log(receipt+"Done!");
      })
      .on('error', console.error)
    }else console.log("wallet not connected");    

  }

  async GetNCompanyReview(from: number, to:number, address: string){
    let abi= require('contracts/Trustify.sol/Trustify.json')
    const contract = new this.web3WalletProvider.eth.Contract(
      abi.abi,
      this.contractAddress
    );
    let reviews : string[];
    let stars : number[];
    [reviews, stars] = await contract.methods.GetNCompanyReview.call();
    return [reviews, stars];
  }
  
  async GetSpecificReview(address: string){
    let abi= require('contracts/Trustify.sol/Trustify.json')
    const contract = new this.web3WalletProvider.eth.Contract(
      abi.abi,
      this.contractAddress
    );
    let review : string;
    let star : number;
    [review, star] = await contract.methods.GetSpecificReview.call();
    return [review, star];
  }

  async GetNMyReview(from : number, to : number){
    let abi= require('contracts/Trustify.sol/Trustify.json')
    const contract = new this.web3WalletProvider.eth.Contract(
      abi.abi,
      this.contractAddress
    );

    let reviews : string[];
    let stars : number[];
    let addresses : string[];
    [reviews, stars, addresses] = await contract.methods.GetNMyReview.call();
    return [reviews, stars, addresses];
  }

  //Ritorna un array con tutte le "stars"
  async GetAverageStarsArray(address : string){
    let abi= require('contracts/Trustify.sol/Trustify.json')
    const contract = new this.web3WalletProvider.eth.Contract(
      abi.abi,
      this.contractAddress
    );
    let stars : number[];
    stars = await contract.methods.GetAverageStars.call();
    return stars;
  }

  //Ritorna la media effettiva di tutte le "stars"
  async GetAverageStars(address : string){
    let array : number[];
    array=await this.GetAverageStarsArray(address);
    /*let sum=0;
    for(let i=0;i<array.length;i++){
      sum+=array[i];
    }
    return sum/array.length;*/
    return array.reduce((a, b) => a + b, 0) / array.length; //dovrebbe calcolare la media direttamente così
  }





}

