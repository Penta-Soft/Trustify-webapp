import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-area-personale',
  templateUrl: './area-personale.component.html',
  styleUrls: ['./area-personale.component.css'],
})
export class AreaPersonaleComponent {
  rating: number = 3;
  starCount: number = 5;
  reviewCheck: boolean = true;

  constructor(private web3: Web3Service) {}

  // async GetMyReview(){
  //   let ul:any = document.getElementById("ReviewList");
  //   if(this.reviewCheck) {
  //     const {0: strValue, 1: stars, 2: address} = await this.web3.GetNMyReview(0, 10);

  //     for(let i=0; i<address.length; i++) {
  //       let li = document.createElement("li");
  //       li.setAttribute("id", "element"+i);
  //       li.appendChild(document.createTextNode(address[i]+' '+stars[i]+' '+strValue[i]));
  //       ul.appendChild(li);
  //     }
  //     this.reviewCheck = false;
  //   } else {
  //     while(ul.firstChild) {
  //       ul.removeChild(ul.firstChild);
  //     }
  //     this.reviewCheck = true;
  //   }
  // }

}
