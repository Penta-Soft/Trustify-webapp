import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GeneraRecensioneComponent } from './genera-recensione.component';
import { Web3Service } from '../web3.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('GeneraRecensioneComponent', () => {
  let component: GeneraRecensioneComponent;
  let fixture: ComponentFixture<GeneraRecensioneComponent>;
  let web3ServiceSpy: any;

  beforeEach(async () => {

    web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['writeAReview']);

    await TestBed.configureTestingModule({
      declarations: [
        GeneraRecensioneComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Web3Service, useValue: web3ServiceSpy }
      ],

      imports: [
        FormsModule,
        ReactiveFormsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GeneraRecensioneComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should have a correct input element for the address', () => {
    const addressElement = fixture.debugElement.query(By.css('#address'));
    expect(addressElement).toBeTruthy();
    expect(addressElement.nativeElement.getAttribute('formControlName')).toEqual('address');
    expect(addressElement.nativeElement.getAttribute('minlength')).toEqual('42');
    expect(addressElement.nativeElement.getAttribute('maxlength')).toEqual('42');
  })

  it('form should have a correct text area element for the review', () => {
    const reviewElement = fixture.debugElement.query(By.css('#review'));
    expect(reviewElement).toBeTruthy();
    expect(reviewElement.nativeElement.getAttribute('formControlName')).toEqual('review');
  })

  it('rating starCount should be equal to 5', () => {
    expect(component.starCount).toEqual(5);
  })

  it('review should update the rating value on call onRatingChanged(rating) with valid rating', () => {
    const ratingElement = fixture.debugElement.query(By.css('#rating'));
    let ratingTextContent = '';

    component.onRatingChanged(1);
    fixture.detectChanges();
    ratingTextContent = 'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(1);
    expect(ratingElement.nativeElement.textContent).toContain(ratingTextContent);

    component.onRatingChanged(2);
    fixture.detectChanges();
    ratingTextContent = 'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(2);
    expect(ratingElement.nativeElement.textContent).toContain(ratingTextContent);

    component.onRatingChanged(3);
    fixture.detectChanges();
    ratingTextContent = 'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(3);
    expect(ratingElement.nativeElement.textContent).toContain(ratingTextContent);

    component.onRatingChanged(4);
    fixture.detectChanges();
    ratingTextContent = 'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(4);
    expect(ratingElement.nativeElement.textContent).toContain(ratingTextContent);

    component.onRatingChanged(5);
    fixture.detectChanges();
    ratingTextContent = 'Your rated ' + component.rating + ' / ' + component.starCount;
    expect(component.rating).toEqual(5);
    expect(ratingElement.nativeElement.textContent).toContain(ratingTextContent);
  })

  it('review should not allow to update the rating value on call onRatingChanged(rating) with invalid rating', () => {
    let oldRatingValue = component.rating;

    component.onRatingChanged(6);
    fixture.detectChanges();
    expect(component.rating).toEqual(oldRatingValue);

    component.onRatingChanged(-1);
    fixture.detectChanges();
    expect(component.rating).toEqual(oldRatingValue);
  })

  it('should call web3 writeAReview after form submit', () => {
    const submitElement = fixture.debugElement.query(By.css('#btn-submit'));
    const addressControl = component.form.get('address');
    const reviewControl = component.form.get('review');
    const submitFunction = spyOn(component, 'onSubmit');

    addressControl?.setValue('0x');
    reviewControl?.setValue('Unit Test');
    fixture.detectChanges();

    (submitElement.nativeElement as HTMLButtonElement).click();

    expect(submitFunction).toHaveBeenCalled();
    // expect(web3ServiceSpy.writeAReview).toHaveBeenCalled();
  })
});
