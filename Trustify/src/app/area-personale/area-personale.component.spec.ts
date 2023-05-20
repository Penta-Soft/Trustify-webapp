import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AreaPersonaleComponent } from './area-personale.component';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { By } from '@angular/platform-browser';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { throwError } from 'rxjs';
import { CustomErrorHandler } from '../custom-error-interceptor';

describe('AreaPersonaleComponent', () => {
  let component: AreaPersonaleComponent;
  let fixture: ComponentFixture<AreaPersonaleComponent>;
  let reviewParserService: any;
  let testReviewsList: Recensione[];
  let retrivePersonalAreaReviewsSpy: any;
  let handleErrorSpy: any;

  beforeEach(async () => {
    const customErrorService = jasmine.createSpyObj('CustomErrorHandler', [
      'handleError',
    ]);
    reviewParserService = jasmine.createSpyObj('RecensioniParserService', [
      'retrivePersonalAreaReviews',
    ]);

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

    retrivePersonalAreaReviewsSpy =
      reviewParserService.retrivePersonalAreaReviews.and.returnValue(
        testReviewsList
      );

    handleErrorSpy =
      customErrorService.handleError.and.returnValue('Connessione persa!');

    await TestBed.configureTestingModule({
      declarations: [AreaPersonaleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RecensioniParserService, useValue: reviewParserService },
        { provide: CustomErrorHandler, useValue: customErrorService },
      ],
      imports: [MatSnackBarModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AreaPersonaleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('TS4RFO4 - user should be able to see the list of his released reviews', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    expect(retrivePersonalAreaReviewsSpy.calls.count()).toBe(1);
    expect(retrivePersonalAreaReviewsSpy).toHaveBeenCalled();
    expect(component.reviews.length).toEqual(3);
    expect(component.reviews).toEqual(testReviewsList);
  }));

  it("TS4RFO4.1 - user should be able to see the approval message if he didn't released any review", fakeAsync(() => {
    const testReviewsList: Recensione[] = [];

    let retrivePersonalAreaReviewsSpy =
      reviewParserService.retrivePersonalAreaReviews.and.returnValue(
        testReviewsList
      );
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    const errorMsgElement = fixture.debugElement.query(By.css('.errorMsg'));
    expect(retrivePersonalAreaReviewsSpy.calls.count()).toBe(1);
    expect(retrivePersonalAreaReviewsSpy).toHaveBeenCalled();
    expect(errorMsgElement.nativeElement).not.toBeNull();
    expect(errorMsgElement.nativeElement.textContent).toEqual(
      'Nessuna recensione presente'
    );
  }));

  it('TS4RFO4.2 - user should be able to see the error message if the connection is lost', fakeAsync(() => {
    reviewParserService =
      reviewParserService.retrivePersonalAreaReviews.and.returnValue(
        throwError(() => new Error('Connessione persa!'))
      );
    fixture.detectChanges();

    tick();

    expect(handleErrorSpy).toHaveBeenCalled();
    expect(handleErrorSpy.calls.count()).toBe(1);
  }));

  it('TS4RFO4.3 - user should be able to see a single review of his own released review list', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
  }));

  it("TS4RFO4.3.1 - user should be able to see a single review's rating parameter", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getRating()).toEqual(5);
  }));

  it("TS4RFO4.3.2 - user should be able to see a single review's description", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getReview()).toEqual('Test1');
  }));

  it("TS4RFO4.3.3 - user should be able to see a single review's address", fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getAddress()).toEqual(
      '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'
    );
  }));

  it('should update review indices and call getMyReview()', async () => {
    component['reviewsEndTo'] = 9;

    spyOn(component, 'getMyReview').and.returnValue(Promise.resolve());

    await component.loadMoreReview();

    expect(component['reviewsStartFrom']).toBe(10);
    expect(component['reviewsEndTo']).toBe(19);
    expect(component.getMyReview).toHaveBeenCalled();
  });
});
