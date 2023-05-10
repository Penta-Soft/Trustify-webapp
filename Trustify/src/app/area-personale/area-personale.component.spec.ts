import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AreaPersonaleComponent } from './area-personale.component';
import { RecensioniParserService } from '../recensioni-parser.service';
import * as Rx from 'rxjs';
import { Recensione } from '../recensione';

describe('AreaPersonaleComponent', () => {
  let component: AreaPersonaleComponent;
  let fixture: ComponentFixture<AreaPersonaleComponent>;
  let reviewParserServiceSpy: any;

  beforeEach(async () => {

    reviewParserServiceSpy = jasmine.createSpyObj('RecensioniParserService', ['retrivePersonalAreaReviews']);

    await TestBed.configureTestingModule({
      declarations: [AreaPersonaleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: RecensioniParserService, useValue: reviewParserServiceSpy },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AreaPersonaleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RFO4 - user should be able to see the list of his released reviews', fakeAsync(()=> {

  }));

  it('RFO4.1 - user should be able to see the approval message if he didn\'t released any review', () => {

  });

  it('RFO4.2 - user should be able to see the error message if the connection is lost', () => {

  });

  it('RFO4.3 - user should be able to see a single review of his own released review list', () => {

  });

  it('RFO4.3.1 - user should be able to see a single review\'s rating parameter', () => {

  });

  it('RFO4.3.2 - user should be able to see a single review\'s description', () => {

  });

  it('RFO4.3.3 - user should be able to see a single review\'s address', () => {

  });

  it('should call web3 retrivePersonalAreaReviews after component initialize', () => {
    fixture.detectChanges();
    expect(reviewParserServiceSpy.retrivePersonalAreaReviews).toHaveBeenCalled();
  });

  it('should display review after component initialize', () => {
    const testReviews = [new Recensione('Test', 5, 'ACTIVE', '0x')];
    component.reviews = testReviews;
    fixture.detectChanges();
    expect(component.reviews).toEqual(testReviews);
    expect(component.reviews.length).toBe(1);
  })

});
