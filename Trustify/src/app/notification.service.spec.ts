import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spySnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    const mockNgZone = jasmine.createSpyObj('mockNgZone', ['run', 'runOutsideAngular'])

    TestBed.configureTestingModule({
      providers: [
        NotificationService,
        {provide: MatSnackBar, useValue: spySnackBar},
      ]});

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    mockNgZone.run.and.callFake(function() {})
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
