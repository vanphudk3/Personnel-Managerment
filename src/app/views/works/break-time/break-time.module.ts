import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakTimeComponent } from './break-time.component';
import { BreakTimeRoutingModule } from './break-time-routing.module';
@NgModule({
  imports: [
    CommonModule,
    BreakTimeRoutingModule
  ],
  declarations: [BreakTimeComponent]
})
export class BreakTimeModule { }
