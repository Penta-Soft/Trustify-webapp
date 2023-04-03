import { Component, OnInit } from '@angular/core';
import { RecensioniService } from '../recensioni.service';
import { Recensione } from '../recensione';
@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  starArr: number [] = [];
  ratingStars: number[]=[];
  recensione: Recensione[] = [];
  plot: number = 0;

  constructor(private recensioni: RecensioniService) {}

  ngOnInit() {
    // for(let i = 0; i < this.recensione.length; i++) {
    //   for(let j = 0; j < this.recensione.at(i).valutazione; j++) {
    //     console.log(j);
    //     this.ratingStars.push(j);
    //   }
    // }
    this.recensione = this.recensioni.getRecensioni();
    for(let i of this.recensione) {
      this.ratingStars.push(i.valutazione)
    }
    for (let index = 0; index < this.starCount; index++) {
      this.starArr.push(index);
    }
    console.log(this.recensione)
    console.log(this.ratingStars.length)
    console.log(this.starArr.length);

  }

  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }


  showStarsReview(index:number) {
    console.log('stars'+index)
      // if(index < this.ratingStars[0]) {
      //   if(index==4 && this.plot<5) {
      //     this.plot += 1;
      //   }
      //   return 'star';
      // } else {
      //   if(index==4 && this.plot<5) {
      //     this.plot += 1;
      //   }
      //   return 'star_border';
      // }
  }
}
