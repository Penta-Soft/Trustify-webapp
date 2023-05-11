import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RecensioneComponent } from './recensione.component';
import { Web3Service } from '../web3.service';
import { By } from '@angular/platform-browser';

describe('RecensioneComponent', () => {
  let component: RecensioneComponent;
  let fixture: ComponentFixture<RecensioneComponent>;
  let writeAReviewSpy: any;

  beforeEach(async () => {

    const web3ServiceSpy = jasmine.createSpyObj('Web3Service', ['writeAReview', 'deleteReview']);
    writeAReviewSpy = web3ServiceSpy.writeAReview.and.returnValue(Promise.resolve(true))

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

  it('RFO5 - user should be able to modify a review calling editReview', () => {
    component.activeAction = true;
    component.isReviewEditable = true;
    const editReviewSpy = spyOn(component, 'editReview');

    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('#edit-btn'));
    (editButton.nativeElement as HTMLButtonElement).click();
    
    expect(editReviewSpy).toHaveBeenCalled();
  });

  it('RFO5 - user should be able to modify a review calling writeAReview', fakeAsync(() => {
    component.isReviewEditable = true;
    fixture.detectChanges();
    component.editReview();
    
    tick();

    fixture.detectChanges();
    expect(writeAReviewSpy).toHaveBeenCalled(); 
    expect(component.form.value.status).toEqual('MODIFIED');
  }));

  it('RFO5.1 - user should be able to see the error message if connection is lost', () => {

  });

  it('RFO5.2 - user should be able to modify the review\'s rating parameter', () => {
    fixture.detectChanges();
    component.reviewEditable(true);
    const onRatingChangedSpy = spyOn(component, 'onRatingChanged');

    component.onRatingChanged(1);
    expect(onRatingChangedSpy).toHaveBeenCalled();

  });

  it('RFO5.2.1 - user should be able to see the error message if he didn\'t inserted the rating parameter', () => {

  });

  it('RFO5.2.2 - user should be able to see the error message if the inserted rating parameter is invalid', () => {

  });

  it('RFO5.2.3 - user should be able to modify the rating parameter value to 1', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    component.onRatingChanged(1);
    expect(component.form.value.rating).toEqual(1);
  });

  it('RFO5.2.4 - user should be able to modify the rating parameter value to 2', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    component.onRatingChanged(2);
    expect(component.form.value.rating).toEqual(2);
  });

  it('RFO5.2.5 - user should be able to modify the rating parameter value to 3', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    component.onRatingChanged(3);
    expect(component.form.value.rating).toEqual(3);
  });

  it('RFO5.2.6 - user should be able to modify the rating parameter value to 4', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    component.onRatingChanged(4);
    expect(component.form.value.rating).toEqual(4);
  });

  it('RFO5.2.7 - user should be able to modify the rating parameter value to 5', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    component.onRatingChanged(5);
    expect(component.form.value.rating).toEqual(5);
  });

  it('RFO5.3 - user should be able to modify the review\'s description', () => {
    fixture.detectChanges();
    component.reviewEditable(true);

    const reviewControl = component.form.controls['review'];
    reviewControl.setValue('Test review');

    expect(component.form.value.review).toEqual('Test review');
  });
});