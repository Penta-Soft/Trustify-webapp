import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css']
})
export class RecensioneComponent implements OnInit{
  arrayDescriptions: string[] = [];
  arrayRatings: number[] = [];
  arrayAddresses: string[] = [];
  len: number[] = [0,1];
  starArr: number[] = [0,1,2,3,4];
  modified: boolean = false;
  // @Output() private ratingUpdated = new EventEmitter();//aggiuntoa


  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    const reviews = this.web3.GetNMyReview(0,10);
    reviews.then((val) => {
      this.arrayDescriptions = val[0];
      // console.log('arrayDescriptions'+this.arrayDescriptions);
      this.arrayRatings = val[1];
      this.arrayAddresses = val[2];
    }).catch((val) => {'problem'});
  }

  showStarsReview(index: number, status: number) {
    // console.log('i'+index+'s'+status);
    if(index < this.arrayRatings[status]) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  async editReview(index: number) {
    // let n:number = await this.web3.GetNumberReviews('0x46280DAc7ddB65FD98cFEd1C53D848068b5ccb3E');
    // console.log('number'+n);
    let btn = document.getElementById('modifica'+index);
    let descrizione = document.getElementById('descrizione'+index);

    if(!this.modified && btn?.innerText == 'Modifica') {
      if(descrizione) descrizione.setAttribute('contenteditable', 'true');
      if(btn) btn.innerHTML = 'Fatto';
      this.modified = true;
    } else if(this.modified && btn?.innerText == 'Fatto') {
      //chiamata a writeAReview()
      if(descrizione) descrizione.setAttribute('contenteditable', 'false');
      if(btn) btn.innerHTML = 'Modifica';
      // console.log(descrizione?.innerText);
      this.modified = false;
    } else {
      alert('Finisci la modifica');
    }
  }

  // onClick(rating:number) {
  //   console.log(rating)
  //   this.ratingUpdated.emit(rating);
  //   return false;
  // }

}
