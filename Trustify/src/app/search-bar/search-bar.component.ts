import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { CustomErrorHandler } from '../custom-error-interceptor';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  form: FormGroup = new FormGroup({});
  reviews: Recensione[] = [];

  private readonly ADDRESS_VALIDATOR_PATTERN = '^0x[a-fA-F0-9]{40}$';

  private readonly DEFAULT_ADDRESS =
    '0x43aB5C6Ea8728c34cc779d9a4f9E2aF8Cd923C5D';
  private readonly REVIEW_INDEX_ADDER = 10;
  private reviewsStartFrom = 0;
  private reviewsEndTo = 9;

  constructor(
    private formBuilder: FormBuilder,
    private reviewParserService: RecensioniParserService,
    private errorHandler: CustomErrorHandler
  ) {}

  async ngOnInit() {
    this.form = this.formBuilder.group({
      address: [
        null,
        [
          Validators.required,
          Validators.pattern(this.ADDRESS_VALIDATOR_PATTERN),
        ],
      ],
    });

    await this.getCompanyReview(this.DEFAULT_ADDRESS);
  }

  async loadMoreReview() {
    this.reviewsStartFrom = this.reviewsEndTo + 1;
    this.reviewsEndTo += this.REVIEW_INDEX_ADDER;

    await this.getCompanyReview(this.DEFAULT_ADDRESS);
  }

  onSubmit(form: any) {
    this.reviews = [];
    this.getCompanyReview(form.value.address);
  }

  async getCompanyReview(address: string) {
    try {
      let tmpReviews = await this.reviewParserService.retriveHomePageReviews(
        this.reviewsStartFrom,
        this.reviewsEndTo,
        address
      );
      for (let rev of tmpReviews) {
        this.reviews.push(rev);
      }
    } catch (error: any) {
      this.errorHandler.handleError(error);
    }
  }
}
