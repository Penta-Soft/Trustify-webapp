import { Component, OnInit } from '@angular/core';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { CustomErrorHandler } from '../custom-error-interceptor';
@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  reviews: Recensione[] = [];
  private readonly REVIEW_INDEX_ADDER = 5;
  private reviewsStartFrom = 0;
  private reviewsEndTo = 4;

  constructor(
    private reviewParserService: RecensioniParserService,
    private errorHandler: CustomErrorHandler
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
      this.errorHandler.handleError(error);
    }
  }
}
