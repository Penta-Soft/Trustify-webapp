import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should call retrivePersonalAreaReviews after component initialize', () => {
    let getReviewSpy = reviewParserServiceSpy.retrivePersonalAreaReviews.and.returnValue(Rx.of([]));
    fixture.detectChanges();
    expect(getReviewSpy).toHaveBeenCalled();
  });

  it('should display review after component initialize', () => {
    const testReview = new Recensione('Test', 5, 'ACTIVE', '0x')
    component.reviews = [testReview];
    fixture.detectChanges();
    expect(component.reviews).toEqual([testReview])
    expect(component.reviews.length).toBe(1)
  })

});
