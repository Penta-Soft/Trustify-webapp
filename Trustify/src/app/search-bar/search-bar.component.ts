import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']

})

export class SearchBarComponent {

  form: FormGroup = new FormGroup({});
  arrayReviews: string[] = [];
  arrayRatings: number[] = [];
  arrayAddresses: string[] = [];
  arrayStatus: string[] = [];
  len: number[] = [];

  private readonly DEFAULT_ADDRESS = "0x96A85348123DfAd720fFa6193dE5c9792BB65C5e";

  constructor(private formBuilder: FormBuilder, private web3: Web3Service) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.pattern("^0x[a-fA-F0-9]{40}$")]]
    });

    this.getCompanyReview(this.DEFAULT_ADDRESS);
  }

  onSubmit(form: any) {
    this.getCompanyReview(form.value.address);
  }

  getCompanyReview(address: string): void {
    this.arrayReviews = [];
    this.arrayRatings = [];
    this.arrayAddresses = [];
    this.arrayStatus = [];
    this.len = [];

    this.web3.GetNCompanyReview(0, 10, address)
      .then((reviews) => {
        reviews = reviews[0];
        this.arrayReviews = reviews[0];
        this.arrayRatings = reviews[1];
        this.arrayStatus = reviews[2];
        for (let i = 0; i < reviews[0].length; i++) {
          this.len.push(i);
          this.arrayAddresses.push(address);
        }
      })
  }

}
