import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Recensione } from '../recensione';
import { RecensioniService } from '../recensioni.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  form: FormGroup = new FormGroup({});
  recensioni?: Recensione[];

  constructor(private formBuilder: FormBuilder, private recensioniService: RecensioniService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.minLength(42), Validators.maxLength(42)]]
    });
  }

  onSubmit(form: any): void {
    this.recensioni = this.recensioniService.getRecensioni();
  }
}
