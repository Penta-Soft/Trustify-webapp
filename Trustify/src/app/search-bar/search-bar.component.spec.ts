import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchBarComponent } from './search-bar.component';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomErrorHandler } from '../custom-error-interceptor';
import { throwError } from 'rxjs';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let reviewParserService: any;
  let testReviewsList: Recensione[];
  let retriveHomePageReviewsSpy: any;
  let handleErrorSpy: any;

  beforeEach(async () => {
    const customErrorService = jasmine.createSpyObj('CustomErrorHandler', [
      'handleError',
    ]);
    reviewParserService = jasmine.createSpyObj('RecensioniParserService', [
      'retriveHomePageReviews',
    ]);
    handleErrorSpy =
      customErrorService.handleError.and.returnValue('Connessione persa!');

    testReviewsList = [
      new Recensione(
        'Test1',
        5,
        'ACTIVE',
        '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'
      ),
      new Recensione(
        'Test2',
        3,
        'ACTIVE',
        '0x96A85345123DfAc720fFa6193dE5c9792BB65C5e'
      ),
      new Recensione(
        'Test3',
        1,
        'ACTIVE',
        '0x96A85346123DfAc720fFa6193dE5c9792BB65C5e'
      ),
    ];

    retriveHomePageReviewsSpy =
      reviewParserService.retriveHomePageReviews.and.returnValue(
        testReviewsList
      );

    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: RecensioniParserService, useValue: reviewParserService },
        { provide: CustomErrorHandler, useValue: customErrorService },
      ],
      imports: [MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RFO3 - user should be able to see a list of reviews', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    expect(retriveHomePageReviewsSpy.calls.count()).toBe(1);
    expect(retriveHomePageReviewsSpy).toHaveBeenCalled();
    expect(component.reviews.length).toEqual(3);
    expect(component.reviews).toEqual(testReviewsList);
  }));

  it('RFO3.1 - user should be able to see the error message if the connection is lost on component initialize', fakeAsync(() => {
    reviewParserService =
      reviewParserService.retriveHomePageReviews.and.returnValue(
        throwError(() => new Error('Connessione persa!'))
      );
    fixture.detectChanges();

    tick();

    expect(handleErrorSpy).toHaveBeenCalled();
    expect(handleErrorSpy.calls.count()).toBe(1);
  }));

  it('RFO3.2 - user should be able to see the approval message if the list of reviews is empty', fakeAsync(() => {
    const testReviewsList: Recensione[] = [];

    let retriveHomePageReviewsSpy =
      reviewParserService.retriveHomePageReviews.and.returnValue(
        testReviewsList
      );
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    const errorMsgElement = fixture.debugElement.query(
      By.css('.reviewErrorMsg')
    );

    expect(retriveHomePageReviewsSpy.calls.count()).toBe(1);
    expect(retriveHomePageReviewsSpy).toHaveBeenCalled();
    expect(errorMsgElement.nativeElement).not.toBeNull();
    expect(errorMsgElement.nativeElement.textContent).toEqual(
      'Non ci sono recensioni!'
    );
  }));

  it('RFO3.3 - user should be able to see a single review of the list', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
  }));

  it("RFO3.3.1 - user should be able to see a single review's rating parameter", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getRating()).toEqual(5);
  }));

  it("RFO3.3.2 - user should be able to see a single review's description", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getReview()).toEqual('Test1');
  }));

  it("RFO3.3.3 - user should be able to see a single review's address", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getAddress()).toEqual(
      '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'
    );
  }));

  it('RFO8 - user should be able to research the reviews', () => {
    const getCompanyReviewSpy = spyOn(component, 'getCompanyReview');
    const submitButton = fixture.debugElement.query(By.css('#submit-btn'));
    expect(submitButton.nativeElement).toBeDefined();
    fixture.detectChanges();

    expect(getCompanyReviewSpy).toHaveBeenCalled();
  });

  it('RFO8.1 - user should be able to see the error message if the connection is lost on call getCompanyReview', fakeAsync(() => {
    reviewParserService =
      reviewParserService.retriveHomePageReviews.and.returnValue(
        throwError(() => new Error('Connessione persa!'))
      );
    component.getCompanyReview('0x96A85346123DfAc720fFa6193dE5c9792BB65C5e');

    tick();

    expect(handleErrorSpy).toHaveBeenCalled();
    expect(handleErrorSpy.calls.count()).toBe(1);
  }));

  it('RFO8.2 - user should be able to enter the wallet address to research the reviews', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
    fixture.detectChanges();
    expect(component.form.value.address).toEqual(
      '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'
    );
  });

  it('RFO8.2.1 - user should be able to see the error message if the address is empty', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('');
    fixture.detectChanges();
    const errorMsgElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(errorMsgElement.nativeElement.textContent).toEqual(
      'Inserire un indirizzo'
    );
  });

  it('RFO8.2.2 - user should be able to see the error message is the address is invalid', () => {
    fixture.detectChanges();
    const addressControl = component.form.controls['address'];
    addressControl.setValue('0x invalid');
    fixture.detectChanges();
    const errorMsgElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(errorMsgElement.nativeElement.textContent).toEqual(
      "L'indirizzo non rispetta il formato corretto "
    );
  });

  it('should update review indices and call getCompanyReview()', async () => {
    // Arrange
    const getCompanyReviewSpy = spyOn(component, 'getCompanyReview');
    component['reviewsStartFrom'] = component['REVIEW_INDEX_START'];
    component['reviewsEndTo'] = component['REVIEW_INDEX_END'];

    // Act
    await component['loadMoreReview']();

    // Assert
    expect(component['reviewsStartFrom']).toBe(
      component['REVIEW_INDEX_START'] + component['REVIEW_INDEX_ADDER']
    );
    expect(component['reviewsEndTo']).toBe(
      component['REVIEW_INDEX_END'] + component['REVIEW_INDEX_ADDER']
    );
    expect(getCompanyReviewSpy).toHaveBeenCalledWith(
      component['DEFAULT_ADDRESS']
    );
  });

  it('should reset review data and call getCompanyReview() with form address', async () => {
    // Arrange
    component.reviews = [
      /* existing reviews */
    ];
    const address = '0xABC123';

    const form = {
      value: {
        address: address,
      },
    };

    const getCompanyReviewSpy = spyOn(component, 'getCompanyReview');

    // Act
    await component.onSubmit(form);

    // Assert
    expect(component.reviews).toEqual([]);
    expect(component['reviewsStartFrom']).toBe(component['REVIEW_INDEX_START']);
    expect(component['reviewsEndTo']).toBe(component['REVIEW_INDEX_END']);
    expect(getCompanyReviewSpy).toHaveBeenCalledWith(address);
  });
});
