import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchBarComponent } from './search-bar.component';
import { RecensioniParserService } from '../recensioni-parser.service';
import { Recensione } from '../recensione';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let reviewParserService: any;
  let testReviewsList: Recensione[];
  let retriveHomePageReviewsSpy: any;
  beforeEach(async () => {

    reviewParserService = jasmine.createSpyObj('RecensioniParserService', ['retriveHomePageReviews']);

    testReviewsList = [
      new Recensione('Test1', 5, 'ACTIVE', '0x96A85348123DfAc720fFa6193dE5c9792BB65C5e'),
      new Recensione('Test2', 3, 'ACTIVE', '0x96A85345123DfAc720fFa6193dE5c9792BB65C5e'),
      new Recensione('Test3', 1, 'ACTIVE', '0x96A85346123DfAc720fFa6193dE5c9792BB65C5e')
    ];

    retriveHomePageReviewsSpy = reviewParserService.retriveHomePageReviews.and.returnValue(testReviewsList);

    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: RecensioniParserService, useValue: reviewParserService }
      ]
    })
      .compileComponents();

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
    expect(component.reviews).toEqual(testReviewsList)
  }));

  it('RFO3.1 - user should be able to see the error message if the connection is lost', () => {

  });

  it('RFO3.2 - user should be able to see the approval message if the list of reviews is empty', fakeAsync(() => {
    const testReviewsList: Recensione[] = [];

    let retriveHomePageReviewsSpy = reviewParserService.retriveHomePageReviews.and.returnValue(testReviewsList);
    fixture.detectChanges();

    tick();

    fixture.detectChanges();

    const errorMsgElement = fixture.debugElement.query(By.css('.reviewErrorMsg'));

    expect(retriveHomePageReviewsSpy.calls.count()).toBe(1);
    expect(retriveHomePageReviewsSpy).toHaveBeenCalled();
    expect(errorMsgElement.nativeElement).not.toBeNull();
    expect(errorMsgElement.nativeElement.textContent).toEqual('Non ci sono recensioni!');
  }));

  it('RFO3.3 - user should be able to see a single review of the list', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
  }));

  it('RFO3.3.1 - user should be able to see a single review\'s rating parameter', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getRating()).toEqual(5);
  }));

  it('RFO3.3.2 - user should be able to see a single review\'s description', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getReview()).toEqual('Test1');
  }));

  it('RFO3.3.3 - user should be able to see a single review\'s address', fakeAsync(() => {
    fixture.detectChanges();

    tick();

    fixture.detectChanges();
    expect(component.reviews.at(0)).toBeDefined();
    expect(component.reviews.at(0)?.getAddress()).toEqual('0x96A85348123DfAc720fFa6193dE5c9792BB65C5e');
  }));
});
