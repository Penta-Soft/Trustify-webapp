import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css']
})
export class RecensioneComponent implements OnInit{
  arrayDescriptions: any;
  arrayRatings: any;
  arrayAddresses: string[] = [];
  len: number[] = [0,1];

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    const a = this.web3.GetNMyReview(0,10);
    a.then((val) => {
      this.arrayDescriptions = val[0];
      console.log('arrayDescriptions'+this.arrayDescriptions);
      this.arrayRatings = val[1];
      this.arrayAddresses = val[2];
    }).catch((val) => {'problem'});
    // console.log(this.arrayAddresses.length());
  }


}
