import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkTimeComponent } from './work-time.component';
import { WorkTimeRoutingModule } from './work-time-routing.module';
import { AlertModule, AvatarModule, BadgeModule, ButtonModule, CardModule, CollapseModule, FormModule, GridModule, ModalModule, PaginationModule, SpinnerModule, TableModule, ToastModule, TooltipModule, UtilitiesModule } from '@coreui/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule } from '@coreui/icons-angular';

@NgModule({
  imports: [
    CommonModule,
    WorkTimeRoutingModule,
    TableModule,
    UtilitiesModule,
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
    IconModule,
    SpinnerModule,
    TooltipModule,
    AvatarModule,
    CollapseModule
  ],
  declarations: [WorkTimeComponent]
})
export class WorkTimeModule { }
