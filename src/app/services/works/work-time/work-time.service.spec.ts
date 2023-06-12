/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkTimeService } from './work-time.service';

describe('Service: WorkTime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkTimeService]
    });
  });

  it('should ...', inject([WorkTimeService], (service: WorkTimeService) => {
    expect(service).toBeTruthy();
  }));
});
