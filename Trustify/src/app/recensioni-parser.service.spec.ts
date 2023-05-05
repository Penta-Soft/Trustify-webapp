import { TestBed } from '@angular/core/testing';

import { RecensioniParserService } from './recensioni-parser.service';
import { Web3Service } from './web3.service';

describe('RecensioniParserService', () => {
  let service: RecensioniParserService;
  let web3: jasmine.SpyObj<Web3Service>

  beforeEach(() => {
    const spyWeb3 = jasmine.createSpyObj('Web3', ['setProvider']);

    TestBed.configureTestingModule({
      providers: [
        RecensioniParserService,
        {provide: Web3Service, useValue: spyWeb3}
      ]});
      service = TestBed.inject(RecensioniParserService);
      web3 = TestBed.inject(Web3Service) as jasmine.SpyObj<Web3Service>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

