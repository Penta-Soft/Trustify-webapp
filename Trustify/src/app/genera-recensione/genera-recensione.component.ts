import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Web3Service } from '../web3.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-genera-recensione',
  templateUrl: './genera-recensione.component.html',
  styleUrls: ['./genera-recensione.component.css'],
})
export class GeneraRecensioneComponent implements OnInit {
  rating: number = 3;
  starCount: number = 5;
  isProgressSpinnerVisible: boolean = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private web3: Web3Service,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [
        null,
        [Validators.required, Validators.pattern('^0x[a-fA-F0-9]{40}$')],
      ],
    });
  }

  onRatingChanged(rating: number) {
    this.rating = rating;
  }

  async aggiungi(address: string, review: string) {
    try {
      this.isProgressSpinnerVisible = true;
      await this.web3.writeAReview(address, review, this.rating).finally(() => {
        this.isProgressSpinnerVisible = false;
        this.snackBar.open('Recensione aggiunta con successo!', 'Chiudi', {
          duration: 5000,
        });
        //window.location.reload();
      });
    } catch (error: any) {
      this.snackBar.open(error.message, 'Chiudi', { duration: 10000 });
    }
  }
}
