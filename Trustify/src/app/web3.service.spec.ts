import { TestBed } from '@angular/core/testing';
import Web3 from 'web3';
import { Web3Service } from './web3.service';
import { WalletService } from './wallet.service';

describe('Web3Service', () => {
  let service: Web3Service;
  let wallet: jasmine.SpyObj<WalletService>;
  let web3: jasmine.SpyObj<Web3>;

  beforeEach(() => {
    const spyWallet = jasmine.createSpyObj('WalletService', [
      'getProvider',
      'getAccount',
      'connect',
      'isWalletConnected',
    ]);
    const spyWeb3 = jasmine.createSpyObj(
      'Web3',
      ['setProvider'],
      ['eth', 'utils']
    );

    TestBed.configureTestingModule({
      providers: [
        Web3Service,
        { provide: WalletService, useValue: spyWallet },
        { provide: Web3, useValue: spyWeb3 },
      ],
    });
    service = TestBed.inject(Web3Service);
    wallet = TestBed.inject(WalletService) as jasmine.SpyObj<WalletService>;
    web3 = TestBed.inject(Web3) as jasmine.SpyObj<Web3>;
  });

  it('should be created', () => {
    // web3.setProvider(wallet.getProvider());
    expect(service).toBeTruthy();
  });
});
