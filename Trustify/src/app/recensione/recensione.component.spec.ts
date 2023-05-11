import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecensioneComponent } from './recensione.component';
import { Web3Service } from '../web3.service';

describe('RecensioneComponent', () => {
  let component: RecensioneComponent;
  let fixture: ComponentFixture<RecensioneComponent>;

  beforeEach(async () => {

    let web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['writeAReview', 'deleteReview']);

    await TestBed.configureTestingModule({
      declarations: [RecensioneComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: Web3Service, useValue: web3ServiceSpy }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('RFO3.3.2.1 / RFO4.3.2.1 - user should be able to see the approval message if the review\'s description is empty', () => {

  });

  it('RFO5 - user should be able to modify a review', () => {

  });

  it('RFO5.1 - user should be able to see the error message if connection is lost', () => {

  });

  it('RFO5.2 - user should be able to modify the review\'s rating parameter' , () => {

  });

  it('RFO5.2.1 - user should be able to see the error message if he didn\'t inserted the rating parameter', () => {

  });

  it('RFO5.2.2 - user should be able to see the error message if the inserted rating parameter is invalid', () => {

  });

  it('RFO5.2.3 - user should be able to modify the rating parameter value to 1', () => {

  });

  it('RFO5.2.4 - user should be able to modify the rating parameter value to 2', () => {

  });

  it('RFO5.2.5 - user should be able to modify the rating parameter value to 3', () => {

  });

  it('RFO5.2.6 - user should be able to modify the rating parameter value to 4', () => {

  });

  it('RFO5.2.7 - user should be able to modify the rating parameter value to 5', () => {

  });

  it('RFO5.2.3 - user should be able to modify the rating parameter value to 1', () => {

  });

  it('RFO5.3 - user should be able to modify the review\'s description', () => {

  });
});