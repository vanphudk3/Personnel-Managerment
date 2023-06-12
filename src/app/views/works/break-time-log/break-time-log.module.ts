import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakTimeLogComponent } from './break-time-log.component';
import { BreakTimeLogRoutingModule } from './break-time-log-routing.module';
@NgModule({
  imports: [
    CommonModule,
    BreakTimeLogRoutingModule
  ],
  declarations: [BreakTimeLogComponent]
})
export class BreakTimeLogModule { }
