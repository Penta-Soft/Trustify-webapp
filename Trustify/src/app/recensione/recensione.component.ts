import { Component, OnInit } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css'],
})
export class RecensioneComponent implements OnInit {
  arrayDescriptions: string[] = [];
  arrayRatings: number[] = [];
  arrayAddresses:  string[] = [];
  arrayRatings2: number[] = [];
  len: number[] = [];
  modified: boolean = false;

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    const reviews = this.web3.GetNMyReview(0, 10);
    reviews
      .then((val) => {
        this.arrayDescriptions = val[0];
        // console.log('arrayDescriptions'+this.arrayDescriptions);
        this.arrayRatings = val[1];
        this.arrayAddresses = val[2];
        console.log('dim' + val[2].length);
        for (let i = 0; i < val[2].length; i++) {
          this.len.push(i);
          this.arrayRatings2.push(this.arrayRatings[i]);
        }
      })
      .catch((val) => {
        'problem';
      });
  }

  // showStarsReview(index: number, status: number) {
  //   // console.log('i'+index+'s'+status);
  //   if (index < this.arrayRatings[status]) {
  //     return 'star';
  //   } else {
  //     return 'star_border';
  //   }
  // }

  async editReview(index: number) {
    let btn = document.getElementById('modifica'+index);
    let btn2 = document.getElementById('cancella'+index);
    let recensione = document.getElementById('descrizione'+index);

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
      let indirizzo = document.getElementById('indirizzo'+index)?.innerText;
      console.log(indirizzo);
      this.modified = false;
      console.log('prova'+this.arrayRatings[index]);
      if(indirizzo) this.web3.WriteAReview(indirizzo,String(recensioneText),this.arrayRatings2[index]);
    } else {
      alert('Finisci la modifica');
    }
  }

  async deleteReview(index: number) {
    let btn2 = document.getElementById('cancella'+index);
    if(btn2?.innerText == 'Annulla') {
      let btn = document.getElementById('modifica'+index);
      if(btn) btn.innerHTML = 'Modifica';
      this.modified = false;
      btn2.innerHTML = 'Cancella';
      let recensione = document.getElementById('descrizione'+index);
      if(recensione) recensione.innerHTML = this.arrayDescriptions[index];
    } else {
          await this.web3.DeleteReview(this.arrayAddresses[index]);
    }
  }

  onRatingChanged(rating: number, value: number) {
    if(this.modified) {
      this.arrayRatings2[value] = rating;
    }
  }

}
