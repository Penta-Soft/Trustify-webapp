import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit{
  arrayDescriptions: string[] = [];
  arrayRatings: number[] = [];
  arrayAddresses:  string[] = [];
  len: number[] = [];
  modified: boolean = false;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    const reviews = this.web3.GetNMyReview(0, 10);
    reviews
      .then((val) => {
        this.arrayDescriptions = val[0];
        // console.log('arrayDescriptions'+this.arrayDescriptions);
        this.arrayRatings = val[1];
        this.arrayAddresses = val[2];
        console.log('dim' + val[2].length);
        for (let i = 0; i < val[2].length; i++) {
          this.len.push(i);
        }
      })
      .catch((val) => {
        'problem';
      });
  }

}
