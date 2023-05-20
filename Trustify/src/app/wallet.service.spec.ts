import { TestBed, fakeAsync } from '@angular/core/testing';

import { WalletService } from './wallet.service';
import { WindowRefService } from './window-ref.service';
import Web3 from 'web3';

describe('WalletService', () => {
  let service: WalletService;
  let window: jasmine.SpyObj<WindowRefService>;
  let web3: jasmine.SpyObj<Web3>;

  beforeEach(() => {
    const spyWindow = jasmine.createSpyObj('WindowRefService', [
      'nativeWindow',
    ]);
    const spyWeb3 = jasmine.createSpyObj('Web3', ['setProvider']);

    TestBed.configureTestingModule({
      providers: [
        WalletService,
        { provide: WindowRefService, useValue: spyWindow },
        { provide: Web3, useValue: spyWeb3 },
      ],
    });
    service = TestBed.inject(WalletService);
    window = TestBed.inject(
      WindowRefService
    ) as jasmine.SpyObj<WindowRefService>;
    web3 = TestBed.inject(Web3) as jasmine.SpyObj<Web3>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid provider', () => {
    expect(service.getProvider()).toEqual(
      'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb'
    );
  });
});

describe('WalletService', () => {
  let walletService: WalletService;
  let windowRefService: WindowRefService;
  let web3Mock: any;

  beforeEach(fakeAsync(() => {
    web3Mock = {
      setProvider: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      providers: [WindowRefService, { provide: Web3, useValue: web3Mock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    windowRefService = TestBed.inject(WindowRefService);
    walletService = new WalletService(windowRefService, TestBed.inject(Web3));
  });

  it('should create the WalletService', () => {
    expect(walletService).toBeTruthy();
  });

  it('should return the provider', () => {
    const provider = walletService.getProvider();
    expect(provider).toBe(
      'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb'
    );
  });

  it('should return the account address', async () => {
    walletService['address'] = '0x123';
    const address = await walletService.getAccount();
    expect(address).toBe('0x123');
  });

  it('should return the wallet connection status', async () => {
    walletService['isConnected'] = true;
    const isConnected = await walletService.isWalletConnected();
    expect(isConnected).toBe(true);
  });

  // Add more test cases for the remaining methods
});
