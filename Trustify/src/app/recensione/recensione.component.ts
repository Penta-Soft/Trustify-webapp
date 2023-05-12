import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css'],
})
export class RecensioneComponent {
  form: FormGroup = new FormGroup({});

  @Input('Review') review: string = '';
  @Input('Rating') rating: number = 0;
  @Input('Address') address: string = '';
  @Input('Status') status: string = '';
  @Input('ActiveAction') activeAction: boolean = true;

  isReviewEditable: boolean = false;
  isProgressSpinnerVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private web3: Web3Service) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      review: this.review,
      rating: this.rating,
      address: this.address,
      status: this.status,
    });

    this.reviewEditable(false);
  }

  onRatingChanged(rating: number) {
    if (this.isReviewEditable) {
      this.rating = rating;
      this.form.controls['rating'].setValue(rating);
    }
  }

  async editReview() {
    this.isProgressSpinnerVisible = true;

    this.web3
      .writeAReview(
        this.form.value.address,
        this.form.value.review,
        this.form.value.rating
      )
      .then(() => {
        this.form.controls['status'].setValue('MODIFIED');
      })
      .finally(() => {
        this.isProgressSpinnerVisible = false;
        //window.location.reload();
      });

    this.reviewEditable(false);
  }

  async deleteReview() {
    this.isProgressSpinnerVisible = true;

    this.web3.deleteReview(this.form.value.address).finally(() => {
      this.isProgressSpinnerVisible = false;
      //window.location.reload();
    });
  }

  reviewEditable(value: boolean) {
    this.isReviewEditable = value;

    if (this.isReviewEditable) {
      this.form.controls['rating'].enable();
      this.form.controls['review'].enable();
    } else {
      this.form.controls['rating'].disable();
      this.form.controls['review'].disable();
    }
  }
}
