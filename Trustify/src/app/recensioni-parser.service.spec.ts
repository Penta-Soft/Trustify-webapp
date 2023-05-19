import { TestBed } from '@angular/core/testing';
import { Recensione } from './recensione';
import { RecensioniParserService } from './recensioni-parser.service';
import { Web3Service } from './web3.service';

describe('RecensioniParserService', () => {
  let service: RecensioniParserService;
  let web3ServiceSpy: jasmine.SpyObj<Web3Service>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Web3Service', [
      'getCompanyReview',
      'getMyReview',
    ]);

    TestBed.configureTestingModule({
      providers: [
        RecensioniParserService,
        { provide: Web3Service, useValue: spy },
      ],
    });

    service = TestBed.inject(RecensioniParserService);
    web3ServiceSpy = TestBed.inject(Web3Service) as jasmine.SpyObj<Web3Service>;
  });

  it('should retrieve home page reviews', async () => {
    const from = 1;
    const to = 10;
    const address = 'example_address';

    const reviews = {
      0: ['Review 1', 'Review 2'],
      1: [4, 5],
      2: ['Status 1', 'Status 2'],
      3: ['Address 1', 'Address 2'],
    };

    web3ServiceSpy.getCompanyReview.and.resolveTo(reviews);

    const result = await service.retriveHomePageReviews(from, to, address);

    expect(web3ServiceSpy.getCompanyReview).toHaveBeenCalledWith(
      from,
      to,
      address
    );
    expect(result).toEqual([
      new Recensione('Review 1', 4, 'Status 1', address),
      new Recensione('Review 2', 5, 'Status 2', address),
    ]);
  });

  it('should retrieve personal area reviews', async () => {
    const from = 1;
    const to = 10;

    const reviews = {
      0: ['Review 1', 'Review 2'],
      1: [4, 5],
      2: ['Status 1', 'Status 2'],
      3: ['Address 1', 'Address 2'],
    };

    web3ServiceSpy.getMyReview.and.resolveTo(reviews);

    const result = await service.retrivePersonalAreaReviews(from, to);

    expect(web3ServiceSpy.getMyReview).toHaveBeenCalledWith(from, to);
    expect(result).toEqual([
      new Recensione('Review 1', 4, 'Status 1', 'Address 1'),
      new Recensione('Review 2', 5, 'Status 2', 'Address 2'),
    ]);
  });
});
