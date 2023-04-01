import { Component, OnInit } from '@angular/core';

import { StarRatingColor } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor() {}

  ngOnInit() {}
  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }
}
