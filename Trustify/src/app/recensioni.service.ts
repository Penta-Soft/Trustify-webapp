import { Injectable } from '@angular/core';
import { RECENSIONI } from './mock-recensioni';
import { Recensione } from './recensione';

@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  constructor() { }

  getRecensioni(): Recensione[] {
    const recensioni = RECENSIONI;
    return recensioni;
  }
}
