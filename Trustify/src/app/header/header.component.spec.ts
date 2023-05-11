import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from './header.component';
import { WalletService } from '../wallet.service';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let walletServiceSpy: any;

  beforeEach(async () => {
    walletServiceSpy = jasmine.createSpyObj('WalletService', ['connect']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: WalletService, useValue: walletServiceSpy }],
      imports: [MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RFO1 - should connect user wallet via Metamask', () => {
    component.isMetamaskConnected = false;
    fixture.detectChanges();

    const connectMetamaskFunction = spyOn(component, 'changeMetamaskState');
    const connectMetamaskButton = fixture.debugElement.query(
      By.css('#connect-btn')
    );
    fixture.detectChanges();

    expect(connectMetamaskButton).not.toBeNull();
    (connectMetamaskButton.nativeElement as HTMLButtonElement).click();

    expect(connectMetamaskFunction).toHaveBeenCalled();
  });

  it('RFO1.1 - user should be able to see the error message if Metamask is not installed', () => {});

  it('RFO1.2 - user should be able to see the approval message if his wallet connects successfully', () => {});

  // test non tracciati nel documento AdR

  it('should not detect Metamask connection state on component initialize', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(walletServiceSpy.connect).not.toHaveBeenCalled();
  });

  it('should detect Metamask connection state on component reload', () => {
    spyOn(window.localStorage, 'getItem').and.returnValue('true');
    component.ngOnInit();
    fixture.detectChanges();
    expect(walletServiceSpy.connect).toHaveBeenCalled();
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
