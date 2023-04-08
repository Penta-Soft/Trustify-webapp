import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-genera-recensione',
  templateUrl: './genera-recensione.component.html',
  styleUrls: ['./genera-recensione.component.css']
})
export class GeneraRecensioneComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  form: FormGroup = new FormGroup({});


  constructor(private web3: Web3Service, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    });
  }

  onRatingChanged(rating: number) {
    console.log(rating);
    this.rating = rating;
  }

  async aggiungi(address:string, review:string){
    console.log("ratings: "+this.rating);
    console.log("review: "+review);
    console.log("address: "+address);
    await this.web3.WriteAReview(address,review,this.rating);

    //this.recensione=recensione;
  }

}
