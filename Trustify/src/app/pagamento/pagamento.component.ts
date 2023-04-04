import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      address: [null, [Validators.required, Validators.pattern("^0x[a-fA-F0-9]{40}$")]],
      tokens: [null, [Validators.required, Validators.pattern("(?<!\d)0*[1-9]\d*")]]
    });
  }
  
  onSubmit(form: any): void {
    alert("HEH, VOLEVI!");
  }
}
