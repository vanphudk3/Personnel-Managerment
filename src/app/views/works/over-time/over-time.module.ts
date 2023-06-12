import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverTimeComponent } from './over-time.component';
import { OverTimeRoutingModule } from './over-time-routing.module';
@NgModule({
  imports: [
    CommonModule,
    OverTimeRoutingModule
  ],
  declarations: [OverTimeComponent]
})
export class OverTimeModule { }
