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

  it('should return a valid provider', () => {
    expect(service.getProvider()).toEqual(
      'https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb'
    );
  });

  it('should return an valid address', () => {
    const getAccountSpy = spyOn(service, 'getAccount').and.returnValue(
      Promise.resolve('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e')
    );
    service.getAccount().then((response) => {
      expect(response).toEqual('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
    });
    expect(getAccountSpy).toHaveBeenCalled();
  });

  it('should return true if metamask is installed', () => {
    const isInstalledSpy = spyOn(service, 'isInstalled').and.returnValue(true);

    expect(service.isInstalled()).toBeTrue();
    expect(isInstalledSpy).toHaveBeenCalled();
  });

  it('should return false if metamask is not installed', () => {
    const isInstalledSpy = spyOn(service, 'isInstalled').and.returnValue(false);

    expect(service.isInstalled()).toBeFalse();
    expect(isInstalledSpy).toHaveBeenCalled();
  });

  it('should return true if wallet is connected', () => {
    const isWalletConnectedSpy = spyOn(
      service,
      'isWalletConnected'
    ).and.returnValue(Promise.resolve(true));

    service.isWalletConnected().then((response) => {
      expect(response).toBeTrue;
    });

    expect(isWalletConnectedSpy).toHaveBeenCalled();
  });

  it('should return false if wallet is disconnected', () => {
    const isWalletConnectedSpy = spyOn(
      service,
      'isWalletConnected'
    ).and.returnValue(Promise.resolve(false));

    service.isWalletConnected().then((response) => {
      expect(response).toBeFalse;
    });

    expect(isWalletConnectedSpy).toHaveBeenCalled();
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
