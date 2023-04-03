import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';


@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  constructor(private web3: Web3Service) {}

  ngOnInit() {}
  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }
  async aggiungi(address:string, review:string){
    console.log("ratings: "+this.rating);
    console.log("review: "+review);
    console.log("address: "+address);
    await this.web3.WriteAReview(address,review,this.rating);

    //this.recensione=recensione;
  }
}
