import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AreaPersonaleComponent } from './area-personale.component';
import { RecensioniParserService } from '../recensioni-parser.service';

describe('AreaPersonaleComponent', () => {
  let component: AreaPersonaleComponent;
  let fixture: ComponentFixture<AreaPersonaleComponent>;

  beforeEach(async () => {
    let reviewParserServiceSpy = jasmine.createSpyObj('RecensioniParserService', ['retrivePersonalAreaReviews'])
    await TestBed.configureTestingModule({
      declarations: [AreaPersonaleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: RecensioniParserService, useValue: reviewParserServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AreaPersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
