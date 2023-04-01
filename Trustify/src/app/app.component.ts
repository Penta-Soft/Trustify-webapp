import { Component } from '@angular/core';
import { StarRatingColor } from './star-rating/star-rating.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trustify';
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  constructor() {}

  ngOnInit() {}
  onRatingChanged(rating:any) {
    console.log(rating);
    this.rating = rating;
  }
}
