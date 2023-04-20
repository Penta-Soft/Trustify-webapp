import { TestBed } from '@angular/core/testing';

import { RecensioniParserService } from './recensioni-parser.service';

describe('RecensioniParserService', () => {
  let service: RecensioniParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecensioniParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
