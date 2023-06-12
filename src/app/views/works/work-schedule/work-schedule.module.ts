import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkScheduleComponent } from './work-schedule.component';
import { WorkScheduleRoutingModule } from './work-schedule-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FormModule, CardModule, GridModule, BadgeModule, ModalModule, ButtonModule, AlertModule, ToastModule, PaginationModule, TableModule, SpinnerModule, TooltipModule, AvatarModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { CollapseModule } from '@coreui/angular';
@NgModule({
  imports: [
    CommonModule,
    WorkScheduleRoutingModule,
    ReactiveFormsModule,
    FormModule,
    FormsModule,
    CardModule,
    GridModule,
    BadgeModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ModalModule,
    ButtonModule,
    MatFormFieldModule,
    AlertModule,
    ToastModule,
    PaginationModule,
    TableModule,
    IconModule,
    SpinnerModule,
    TooltipModule,
    AvatarModule,
    CollapseModule
  ],
  declarations: [WorkScheduleComponent]
})
export class WorkScheduleModule { }
