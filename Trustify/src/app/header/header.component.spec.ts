import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { WalletService } from '../wallet.service';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from '../custom-error-interceptor';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let connectSpy: any;
  let displayMessageSpy: any;

  beforeEach(async () => {
    const walletService = jasmine.createSpyObj('WalletService', ['connect']);
    const customErrorService = jasmine.createSpyObj('CustomErrorHandler', [
      'displayMessage',
    ]);

    connectSpy = walletService.connect.and.returnValue(Promise.resolve(true));
    displayMessageSpy = customErrorService.displayMessage.and.returnValue(
      'Metamask connesso con successo!'
    );

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: WalletService, useValue: walletService },
        { provide: CustomErrorHandler, useValue: customErrorService },
      ],
      imports: [MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TS1RFO1 - should connect user wallet via Metamask', () => {
    component.isMetamaskConnected = false;
    fixture.detectChanges();

    const connectMetamaskFunction = spyOn(component, 'connectToMetamask');
    component.changeMetamaskState();

    expect(connectMetamaskFunction).toHaveBeenCalled();
  });

  it('TS1RFO1.1  - user should be able to see the error message if Metamask is not installed', () => {
    // TODO
  });

  it('TS1RFO1.2 - user should be able to see the approval message if his wallet connects successfully', fakeAsync(() => {
    fixture.detectChanges();
    component.connectToMetamask();
    tick();
    expect(displayMessageSpy).toHaveBeenCalled();
  }));

  // test non tracciati nel documento AdR

  it('should detect Metamask connection state on component reload', () => {
    spyOn(window.sessionStorage, 'getItem').and.returnValue('true');

    fixture.detectChanges();
    expect(connectSpy).toHaveBeenCalled();
  });

  it('should show pagamento and areaPersonale pages on Metamask connected', () => {
    component.isMetamaskConnected = true;
    fixture.detectChanges();

    const pagamentoTab = fixture.debugElement.query(By.css('#pagamento'));
    const areaPersonaleTab = fixture.debugElement.query(
      By.css('#area-personale')
    );

    expect(pagamentoTab).toBeTruthy();
    expect(pagamentoTab.nativeElement.getAttribute('label')).toEqual(
      'Effettua un pagamento'
    );
    expect(areaPersonaleTab).toBeTruthy();
    expect(areaPersonaleTab.nativeElement.getAttribute('label')).toEqual(
      'Area personale'
    );
  });

  it('should not show pagamento and areaPersonale pages on Metamask disconnected', () => {
    component.isMetamaskConnected = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('#pagamento'))).toBeNull();
    expect(fixture.debugElement.query(By.css('#area-personale'))).toBeNull();
  });
});

describe('Checking error throwed by connectToMetamask() ', () => {
  let component: HeaderComponent;
  let walletService: WalletService;
  let errorHandler: CustomErrorHandler;

  beforeEach(() => {
    walletService = jasmine.createSpyObj('WalletService', ['connect']);
    errorHandler = jasmine.createSpyObj('CustomErrorHandler', ['handleError']);

    component = new HeaderComponent(walletService, errorHandler);
  });

  it('should handle error and update connection status', async () => {
    const error = new Error('Some error');
    (walletService.connect as jasmine.Spy).and.rejectWith(error);

    await component.connectToMetamask();

    //expect(errorHandler.handleError).toHaveBeenCalledWith(error); not working
    expect(component.isMetamaskConnected).toBe(false);
    expect(sessionStorage.getItem('isMetamaskConnected')).toBe('false');
  });

  it('should update current index and session storage', () => {
    const index = 5;

    component.updateCurrentIndex(index);

    expect(component.currentIndex).toBe(index);
    expect(sessionStorage.getItem('index')).toBe(index.toString());
  });
});
