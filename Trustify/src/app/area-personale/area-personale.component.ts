import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit{
  arrayReviews: string[] = [];
  arrayRatings: number[] = [];
  arrayAddresses:  string[] = [];
  arrayStatus: string[] = [];
  len: number[] = [];
  EditInProgress: boolean = false;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    const reviews = this.web3.GetNMyReview(0, 10);
    reviews
      .then((val) => {
        this.arrayReviews = val[0];
        this.arrayRatings = val[1];
        this.arrayAddresses = val[2];
        console.log('dim' + val[2].length);
        for (let i = 0; i < val[2].length; i++) {
          this.len.push(i);
        }
        this.arrayStatus = val[3];
      })
      .catch((val) => {
        'problem';
      });
  }

  check(modifica: boolean) {
    this.EditInProgress = modifica;
    console.log('ap'+this.EditInProgress)
  }

}
