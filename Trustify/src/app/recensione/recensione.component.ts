import { Component, Input, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css'],
})
export class RecensioneComponent implements OnInit {
  @Input('Description') Description: string = '';
  @Input('Rating') Rating: number = 0;
  @Input('Address') Address: string = '';
  modified: boolean = false;
  @Input('index') index: number = 0;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {

  }

  // showStarsReview(this.index: number, status: number) {
  //   // console.log('i'+this.index+'s'+status);
  //   if (this.index < this.arrayRatings[status]) {
  //     return 'star';
  //   } else {
  //     return 'star_border';
  //   }
  // }

  async editReview() {
    let btn = document.getElementById('modifica'+this.index);
    let btn2 = document.getElementById('cancella'+this.index);
    let recensione = document.getElementById('descrizione'+this.index);

    if(!this.modified && btn?.innerText == 'Modifica') {
      if(recensione) recensione.setAttribute('contenteditable', 'true');
      if(btn) btn.innerHTML = 'Fatto';
      if(btn2) btn2.innerHTML = 'Annulla';
      this.modified = true;
    } else if (this.modified && btn?.innerText == 'Fatto') {
      if(recensione) recensione.setAttribute('contenteditable', 'false');
      if(btn) btn.innerHTML = 'Modifica';
      if(btn2) btn2.innerHTML = 'Cancella';
      let recensioneText = recensione?.innerText;
      console.log(recensione?.innerText);
      let indirizzo = document.getElementById('indirizzo'+this.index)?.innerText;
      console.log(indirizzo);
      this.modified = false;
      console.log('prova'+this.Rating);
      if(indirizzo) this.web3.WriteAReview(indirizzo,String(recensioneText),this.Rating);
    } else {
      alert('Finisci la modifica');
    }
  }

  async deleteReview() {
    let btn2 = document.getElementById('cancella'+this.index);
    if(btn2?.innerText == 'Annulla') {
      let btn = document.getElementById('modifica'+this.index);
      if(btn) btn.innerHTML = 'Modifica';
      this.modified = false;
      btn2.innerHTML = 'Cancella';
      let recensione = document.getElementById('descrizione'+this.index);
      if(recensione) recensione.innerHTML = this.Description;
    } else {
        await this.web3.DeleteReview(this.Address);
    }
  }

  onRatingChanged(rating: number) {
    if(this.modified) {
      this.Rating = rating;
    }
  }

}

