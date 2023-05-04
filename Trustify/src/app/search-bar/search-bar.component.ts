import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
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
    '0x429B104562dEE54B1324625a8845Bd7Ca1B3eD3D'; //old 0x96A85348123DfAd720fFa6193dE5c9792BB65C5e
  private readonly REVIEWS_FROM = 0;
  private readonly REVIEWS_TO = 10;

  constructor(
    private formBuilder: FormBuilder,
    private reviewParserService: RecensioniParserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [
        null,
        [
          Validators.required,
          Validators.pattern(this.ADDRESS_VALIDATOR_PATTERN),
        ],
      ],
    });

    this.getCompanyReview(this.DEFAULT_ADDRESS);
  }

  onSubmit(form: any) {
    this.getCompanyReview(form.value.address);
  }

  async getCompanyReview(address: string) {
    try {
      this.reviews = await this.reviewParserService.retriveHomePageReviews(
        this.REVIEWS_FROM,
        this.REVIEWS_TO,
        address
      );
    } catch (error) {
      this.reviews = [];
    }
  }
}
