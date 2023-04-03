import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  constructor(private serviceReview: RecensioniService, private cd:ChangeDetectorRef) {}

  ngOnInit() {
    this.recensione = this.serviceReview.getRecensioni();
    for(let i of this.recensione) {
      this.ratingStars.push(i.valutazione)
    }
    for (let index = 0; index < this.starCount; index++) {
      this.starArr.push(index);
    }
    console.log(this.ratingStars)
    console.log(this.starArr.length);
    this.cd.detectChanges();
  }

  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }

  showStarsReview(indexStar:number, indexReview:number): string {
    console.log(indexReview);
    if(indexStar < this.ratingStars[indexReview]) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}
