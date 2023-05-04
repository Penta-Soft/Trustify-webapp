import { ComponentFixture, TestBed } from '@angular/core/testing';
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
    const addressElement = fixture.debugElement.query(By.css('#review'));
    expect(addressElement).toBeTruthy();
    expect(addressElement.nativeElement.getAttribute('formControlName')).toEqual('review');
  })
});
