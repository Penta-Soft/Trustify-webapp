import { Component, OnInit } from '@angular/core';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  reviews: Recensione[] = [];
  private readonly REVIEW_INDEX_ADDER = 10;
  private reviewsStartFrom = 0;
  private reviewsEndTo = 9;

  constructor(
    private reviewParserService: RecensioniParserService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    await this.getMyReview();
  }

  async loadMoreReview() {
    this.reviewsStartFrom = this.reviewsEndTo + 1;
    this.reviewsEndTo += this.REVIEW_INDEX_ADDER;

    await this.getMyReview();
  }

  async getMyReview() {
    try {
      let tmpReviews =
        await this.reviewParserService.retrivePersonalAreaReviews(
          this.reviewsStartFrom,
          this.reviewsEndTo
        );
      for (let rev of tmpReviews) {
        this.reviews.push(rev);
      }
    } catch (error: any) {
      if (
        error.message.includes(
          'revert Start must be less than the length of the array'
        )
      ) {
        this.snackBar.open('Non ci sono più recensioni da caricare', 'Chiudi', {
          duration: 5000,
        });
      } else {
        this.reviews = [];
      }
    }
  }
}
