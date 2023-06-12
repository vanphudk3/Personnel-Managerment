/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreakTimeLogService } from './break-time-log.service';

describe('Service: BreakTimeLog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakTimeLogService]
    });
  });

  it('should ...', inject([BreakTimeLogService], (service: BreakTimeLogService) => {
    expect(service).toBeTruthy();
  }));
});
