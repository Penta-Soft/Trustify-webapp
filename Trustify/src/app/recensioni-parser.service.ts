import { Injectable } from '@angular/core';
import { Web3Service } from './web3.service';
import { Recensione } from './recensione';

@Injectable({
  providedIn: 'root',
})
export class RecensioniParserService {
  private readonly REVIEW_INDEX = 0;
  private readonly RATING_INDEX = 1;
  private readonly STATUS_INDEX = 2;
  private readonly ADDRESS_INDEX = 3;

  constructor(private web3: Web3Service) {}

  async retriveHomePageReviews(
    from: number,
    to: number,
    address: string
  ): Promise<Recensione[]> {
    return this.web3.getCompanyReview(from, to, address).then((reviews) => {
      let homePageReviews: Recensione[] = [];
      for (
        let currentReview = 0;
        currentReview < reviews[this.REVIEW_INDEX].length;
        currentReview++
      ) {
        homePageReviews.push(
          new Recensione(
            reviews[this.REVIEW_INDEX][currentReview],
            reviews[this.RATING_INDEX][currentReview],
            reviews[this.STATUS_INDEX][currentReview],
            address
          )
        );
      }
      return homePageReviews;
    });
  }

  async retrivePersonalAreaReviews(
    from: number,
    to: number
  ): Promise<Recensione[]> {
    return this.web3.getMyReview(from, to).then((reviews) => {
      let personalAreaReviews: Recensione[] = [];
      for (
        let currentReview = 0;
        currentReview < reviews[this.REVIEW_INDEX].length;
        currentReview++
      ) {
        personalAreaReviews.push(
          new Recensione(
            reviews[this.REVIEW_INDEX][currentReview],
            reviews[this.RATING_INDEX][currentReview],
            reviews[this.STATUS_INDEX][currentReview],
            reviews[this.ADDRESS_INDEX][currentReview]
          )
        );
      }
      return personalAreaReviews;
    });
  }
}
