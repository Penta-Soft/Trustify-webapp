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
});
