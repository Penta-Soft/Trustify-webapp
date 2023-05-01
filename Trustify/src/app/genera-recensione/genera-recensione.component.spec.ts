import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { GeneraRecensioneComponent } from './genera-recensione.component';
import { Web3Service } from '../web3.service';

describe('GeneraRecensioneComponent', () => {
  let component: GeneraRecensioneComponent;
  let fixture: ComponentFixture<GeneraRecensioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GeneraRecensioneComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Web3Service, useValue: { Web3Service } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GeneraRecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
