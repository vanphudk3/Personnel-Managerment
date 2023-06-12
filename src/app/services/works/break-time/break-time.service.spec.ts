/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BreakTimeService } from './break-time.service';

describe('Service: BreakTime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BreakTimeService]
    });
  });

  it('should ...', inject([BreakTimeService], (service: BreakTimeService) => {
    expect(service).toBeTruthy();
  }));
});
