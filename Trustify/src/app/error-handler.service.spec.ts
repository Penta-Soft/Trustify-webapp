import { TestBed } from '@angular/core/testing';

import { ErrorHandlerService } from './error-handler.service';
import { NotificationService } from './notification.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let notification: jasmine.SpyObj<NotificationService>;

  beforeEach(() => {
    const spyNotification = jasmine.createSpyObj('NotificationService', ['showError']);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        {provide: NotificationService, useValue: spyNotification}
      ]
    });
    service = TestBed.inject(ErrorHandlerService);
    notification = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
