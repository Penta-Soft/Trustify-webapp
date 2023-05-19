import { TestBed } from '@angular/core/testing';
import { Recensione } from './recensione';

describe('Recensione', () => {
  let recensione: Recensione;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    recensione = new Recensione('Great experience', 5, 'Active', '0x666666666');
  });

  it('should create an instance', () => {
    expect(recensione).toBeTruthy();
  });

  it('should get the review', () => {
    expect(recensione.getReview()).toBe('Great experience');
  });

  it('should set the review', () => {
    recensione.setReview('Awesome service');
    expect(recensione.getReview()).toBe('Awesome service');
  });

  it('should get the rating', () => {
    expect(recensione.getRating()).toBe(5);
  });

  it('should set the rating', () => {
    recensione.setRating(4);
    expect(recensione.getRating()).toBe(4);
  });

  it('should get the status', () => {
    expect(recensione.getStatus()).toBe('Active');
  });

  it('should set the status', () => {
    recensione.setStatus('Inactive');
    expect(recensione.getStatus()).toBe('Inactive');
  });

  it('should get the address', () => {
    expect(recensione.getAddress()).toBe('0x666666666');
  });

  it('should set the address', () => {
    recensione.setAddress('0x666666666');
    expect(recensione.getAddress()).toBe('0x666666666');
  });
});
