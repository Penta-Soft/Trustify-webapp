import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  reviewCheck: boolean = true;
  form: FormGroup = new FormGroup({});

  constructor(private web3: Web3Service,  private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]});
    // this.web3.GetNMyReview(0,10);
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

  async GetMyReview(){
    let ul:any = document.getElementById("ReviewList");
    if(this.reviewCheck) {
      const {0: strValue, 1: stars, 2: address} = await this.web3.GetNMyReview(0, 10);

      for(let i=0; i<address.length; i++) {
        let li = document.createElement("li");
        li.setAttribute("id", "element"+i);
        li.appendChild(document.createTextNode(address[i]+' '+stars[i]+' '+strValue[i]));
        ul.appendChild(li);
      }
      this.reviewCheck = false;
    } else {
      while(ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      this.reviewCheck = true;
    }
  }

}
