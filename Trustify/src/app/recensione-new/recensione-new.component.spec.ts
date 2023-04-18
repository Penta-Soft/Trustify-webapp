import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensioneNewComponent } from './recensione-new.component';

describe('RecensioneNewComponent', () => {
  let component: RecensioneNewComponent;
  let fixture: ComponentFixture<RecensioneNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecensioneNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecensioneNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
