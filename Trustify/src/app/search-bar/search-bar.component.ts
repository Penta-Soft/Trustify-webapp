import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Recensione } from '../recensione';
import { RecensioniService } from '../recensioni.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  recensioni?: Recensione[];

  checkoutForm = this.formBuilder.group({
    address: ''
  });

  constructor(private formBuilder: FormBuilder, private recensioniService: RecensioniService) { }

  onSubmit(): void {
    this.recensioni = this.recensioniService.getRecensioni();
  }
}
