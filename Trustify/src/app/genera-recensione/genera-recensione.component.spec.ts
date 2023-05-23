import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
  flush,
  waitForAsync,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GeneraRecensioneComponent } from './genera-recensione.component';
import { Web3Service } from '../web3.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { throwError } from 'rxjs';
import { CustomErrorHandler } from '../custom-error-interceptor';

describe('GeneraRecensioneComponent', () => {
  let component: GeneraRecensioneComponent;
  let fixture: ComponentFixture<GeneraRecensioneComponent>;
  let web3ServiceSpy: any;
  let writeAReviewSpy: any;
  let handleErrorSpy: any;

  beforeEach(async () => {
    const customErrorService = jasmine.createSpyObj('CustomErrorHandler', [
      'handleError',
    ]);
    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['writeAReview']);

    writeAReviewSpy = web3ServiceSpy.writeAReview.and.returnValue(
      Promise.resolve(true)
    );
    handleErrorSpy =
      customErrorService.handleError.and.returnValue('Connessione persa!');

    await TestBed.configureTestingModule({
      declarations: [GeneraRecensioneComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Web3Service, useValue: web3ServiceSpy },
        { provide: CustomErrorHandler, useValue: customErrorService },
      ],

      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneraRecensioneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TS2RFO2.1 - user should be able to see the error message if the connection is lost', fakeAsync(() => {
    fixture.detectChanges();

    writeAReviewSpy = web3ServiceSpy.writeAReview.and.returnValue(
      throwError(() => new Error('Connection lost'))
    );
    const submitElement = fixture.debugElement.query(By.css('#btn-submit'));
    const addressControl = component.form.get('address');
    const reviewControl = component.form.get('review');

    addressControl?.setValue('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
    reviewControl?.setValue('Unit Test');
    fixture.detectChanges();

    (submitElement.nativeElement as HTMLButtonElement).click();
    tick();

    expect(handleErrorSpy).toHaveBeenCalled();
    flush();
  }));

  it('TS2RFO2.2 - user should be able to enter the activity address', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');

    expect(component.form.value.address).toEqual(
      '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'
    );
  });

  it('TS2RFO2.2.1 - user should be able to see the error message if the address is empty', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('');
    fixture.detectChanges();

    const addressErrorElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(addressErrorElement.nativeElement).toBeTruthy();
    expect(addressErrorElement.nativeElement.textContent).toEqual(
      'Inserire un indirizzo'
    );
  });

  it('TS2RFO2.2.2 - user should be able to see the error message if the address is invalid', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x invalidAddress');
    fixture.detectChanges();

    const addressErrorElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(addressErrorElement.nativeElement).toBeTruthy();
    expect(addressErrorElement.nativeElement.textContent).toEqual(
      "L'indirizzo non rispetta il formato corretto"
    );
  });

  it('TS2RFO2.3 - user should be able to enter the review description', () => {
    fixture.detectChanges();
    const reviewControl = component.form.controls['review'];
    reviewControl.setValue('Test review');

    expect(component.form.value.review).toEqual('Test review');
  });

  it("TS2RFO2.4 - user should be able to enter the review's rating parameter", () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(5);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(5);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  it('TS2RFO2.4.3 - user should be able to enter a rating value of 1', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(1);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(1);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  it('TS2RFO2.4.4 - user should be able to enter a rating value of 2', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(2);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(2);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  it('TS2RFO2.4.5 - user should be able to enter a rating value of 3', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(3);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(3);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  it('TS2RFO2.4.6 - user should be able to enter a rating value of 4', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(4);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(4);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  it('TS2RFO2.4.7 - user should be able to enter a rating value of 5', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(5);
    fixture.detectChanges();
    ratingTextContent =
      'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(5);
    expect(ratingElement.nativeElement.textContent).toContain(
      ratingTextContent
    );
  });

  // test non tracciati nel documento AdR

  it('form should have a correct input element for the address', () => {
    const addressElement = fixture.debugElement.query(By.css('#address'));
    expect(addressElement).toBeTruthy();
    expect(
      addressElement.nativeElement.getAttribute('formControlName')
    ).toEqual('address');
    expect(addressElement.nativeElement.getAttribute('minlength')).toEqual(
      '42'
    );
    expect(addressElement.nativeElement.getAttribute('maxlength')).toEqual(
      '42'
    );
  });

  it('form should have a correct text area element for the review', () => {
    const reviewElement = fixture.debugElement.query(By.css('#review'));
    expect(reviewElement).toBeTruthy();
    expect(reviewElement.nativeElement.getAttribute('formControlName')).toEqual(
      'review'
    );
  });

  it('rating starCount should be equal to 5', () => {
    expect(component.starCount).toEqual(5);
  });

  it('review should not allow to update the rating value on call onRatingChanged(rating) with invalid rating', () => {
    let oldRatingValue = component.rating;

    component.onRatingChanged(6);
    fixture.detectChanges();
    expect(component.rating).toEqual(oldRatingValue);

    component.onRatingChanged(-1);
    fixture.detectChanges();
    expect(component.rating).toEqual(oldRatingValue);
  });

  it('should handle error and display error message', async () => {
    const errorMessage = 'Error occurred.';

    const formValue = {
      address: '0x1234567890abcdef1234567890abcdef12345678',
      review: 'Great product!',
    };
    component.form.patchValue(formValue);

    await component.onSubmit(component.form);

    expect(component.isProgressSpinnerVisible).toBe(false);
  });
});
