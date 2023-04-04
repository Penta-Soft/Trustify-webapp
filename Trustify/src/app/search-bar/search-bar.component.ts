import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recensione } from '../recensione';
import { RecensioniService } from '../recensioni.service';
import { Web3Service } from '../web3.service';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']

})
//export interface Recensioni {
 //}
export class SearchBarComponent {

  form: FormGroup = new FormGroup({});
  recensioni?: Recensione[];

  constructor(/*private rece:Recensioni,*/ private formBuilder: FormBuilder, private recensioniService: RecensioniService,private web3: Web3Service) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    });
  }

  async send(address : string){
    let reviews,stars;
    console.log("Daje");
    [reviews, stars]= await this.web3.GetNCompanyReview(0,3,address);
    console.log(reviews,stars);
  }
}
