import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StarRatingComponent } from './star-rating.component';

describe('StarRatingComponent', () => {
  let component: StarRatingComponent;
  let fixture: ComponentFixture<StarRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarRatingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StarRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the rating when onClick is called', () => {
    const rating = 4;
    spyOn(component.ratingUpdated, 'emit');

    component.onClick(rating);

    expect(component.ratingUpdated.emit).toHaveBeenCalledWith(rating);
  });

  it('should return false when onClick is called', () => {
    const rating = 4;
    spyOn(component.ratingUpdated, 'emit');

    const result = component.onClick(rating);

    expect(result).toBeFalse();
  });
});
