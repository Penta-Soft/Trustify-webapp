import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;

  constructor() {}

  ngOnInit() {}
  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }
}
