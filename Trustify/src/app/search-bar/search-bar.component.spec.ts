import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchBarComponent } from './search-bar.component';
import { RecensioniParserService } from '../recensioni-parser.service';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {

    let reviewParserServiceSpy = jasmine.createSpyObj('RecensioniParserService', ['retriveHomePageReviews'])

    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: RecensioniParserService, useValue: reviewParserServiceSpy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
