/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkScheduleService } from './work-schedule.service';

describe('Service: WorkSchedule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkScheduleService]
    });
  });

  it('should ...', inject([WorkScheduleService], (service: WorkScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
