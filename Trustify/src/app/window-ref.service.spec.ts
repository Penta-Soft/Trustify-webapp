import { TestBed } from '@angular/core/testing';
import { WindowRefService } from './window-ref.service';

describe('WindowRefService', () => {
  let windowRefService: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService],
    });
    windowRefService = TestBed.inject(WindowRefService);
  });

  it('should create the service', () => {
    expect(windowRefService).toBeTruthy();
  });

  it('should return the native window object', () => {
    expect(windowRefService.nativeWindow).toEqual(window);
  });
});
