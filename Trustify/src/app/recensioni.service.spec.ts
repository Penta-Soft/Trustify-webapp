import { TestBed } from '@angular/core/testing';

import { RecensioniService } from './recensioni.service';

describe('RecensioniService', () => {
  let service: RecensioniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecensioniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
