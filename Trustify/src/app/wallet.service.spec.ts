import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';
import { WindowRefService } from './window-ref.service';
import Web3 from 'web3';


describe('WalletService', () => {
  let service: WalletService;
  let window: jasmine.SpyObj<WindowRefService>;
  let web3: jasmine.SpyObj<Web3>;

  beforeEach(() => {
    const spyWindow = jasmine.createSpyObj('WindowRefService', ['nativeWindow']);
    const spyWeb3 = jasmine.createSpyObj('Web3', ['setProvider']);

    TestBed.configureTestingModule({
      providers: [
        WalletService,
        {provide: WindowRefService, useValue: spyWindow},
        {provide: Web3, useValue: spyWeb3}
    ]});
    service = TestBed.inject(WalletService);
    window = TestBed.inject(WindowRefService) as jasmine.SpyObj<WindowRefService>;
    web3 = TestBed.inject(Web3) as jasmine.SpyObj<Web3>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid provider', () => {
    expect(service.getProvider()).toEqual('https://sepolia.infura.io/v3/1caadfe504ce4531b041de4bc8927ceb');
  });

  // it('should return an invalid address', () => {
  //   service.getAccount().then(response => {
  //     expect(response).toBeFalsy();
  //   })
  // expect(service.getAccount()).toHaveBeenCalled();
  // });
});
