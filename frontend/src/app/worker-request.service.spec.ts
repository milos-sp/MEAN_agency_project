import { TestBed } from '@angular/core/testing';

import { WorkerRequestService } from './worker-request.service';

describe('WorkerRequestService', () => {
  let service: WorkerRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkerRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
