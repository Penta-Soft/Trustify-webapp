import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Web3Service } from '../web3.service';

@Component({
  selector: 'app-recensione',
  templateUrl: './recensione.component.html',
  styleUrls: ['./recensione.component.css'],
})
export class RecensioneComponent implements OnInit {
  @Input('Review') Review: string = '';
  @Input('Rating') Rating: number = 0;
  @Input('Address') Address: string = '';
  @Input('Status') Status: string = '';
  oldRating : number = 0;
  isDeleted: boolean = false;
  @Input('EditInProgress') EditInProgress: boolean = false;
  @Input('index') index: number = 0;
  @Output('checkmodified') private checkmodified = new EventEmitter();

  constructor(private web3: Web3Service) {}

  ngOnInit(): void {
    this.oldRating = this.Rating;
    if(this.Status=='DELETED')
    this.isDeleted = true;
  }

  async changeButtons(button1: any,button2: any) {
    if(button1.innerText=='Modifica') {
      if(button1) button1.innerText = 'Fatto';
      if(button2) button2.innerText = 'Annulla';
    } else {
      if(button1) button1.innerText = 'Modifica';
      if(button2) button2.innerText = 'Cancella';
    }
  }

  //fa in modo che non ci siano più modifiche in contemporanea
  async checkEdit() {
    if(!this.EditInProgress) {
      this.EditInProgress = true;
    } else {
      this.EditInProgress = false;
    }

    this.checkmodified.emit(this.EditInProgress);
  }

  async enableDisable_DeleteButton() {
    if(!this.isDeleted && this.Status=='DELETED') {
      this.isDeleted = true;
    } else {
      this.isDeleted = false;
    }
  }

  async editReview() {
    let btn = document.getElementById('modifica'+this.index);
    let btn2 = document.getElementById('cancella'+this.index);
    let recensione = document.getElementById('descrizione'+this.index);

    if(!this.EditInProgress && btn?.innerText == 'Modifica') {
      if(recensione) recensione.setAttribute('contenteditable', 'true');
      this.changeButtons(btn,btn2);
      this.checkEdit();
      if(this.isDeleted) this.isDeleted = false;
    } else if (this.EditInProgress && btn?.innerText == 'Fatto') {
        if(recensione) recensione.setAttribute('contenteditable', 'false');
        this.changeButtons(btn,btn2);
        this.checkEdit();
        this.enableDisable_DeleteButton();
        await this.web3.WriteAReview(this.Address,String(recensione?.innerText),this.Rating);
        //tutto questo viene eseguito solo se writeAReview va a buon fine
        this.Status = 'MODIFIED'
        this.oldRating = this.Rating;
        this.Review = String(recensione?.innerText);
        this.enableDisable_DeleteButton();
    } else {
      alert('Finisci la modifica');
    }
  }

  async deleteReview() {
    let btn2 = document.getElementById('cancella'+this.index);
    if(btn2?.innerText == 'Annulla') {
      let btn = document.getElementById('modifica'+this.index);
      this.changeButtons(btn,btn2);
      this.checkEdit();
      this.enableDisable_DeleteButton();
      let recensione = document.getElementById('descrizione'+this.index);
      if(recensione) recensione.innerHTML = this.Review;
      this.Rating = this.oldRating;
      if(recensione) recensione.setAttribute('contenteditable', 'false');
    } else {
        await this.web3.DeleteReview(this.Address);
        this.Status = 'DELETED';
        this.enableDisable_DeleteButton();
    }
  }

  onRatingChanged(rating: number) {
    let btn = document.getElementById('modifica'+this.index);
    if(this.EditInProgress && btn?.innerText == 'Fatto') {
      this.Rating = rating;
    }
  }

}

