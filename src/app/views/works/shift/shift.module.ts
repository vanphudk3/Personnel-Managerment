import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftComponent } from './shift.component';
import { ShiftRoutingModule } from './shift-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { FormModule, CardModule, GridModule, BadgeModule, ModalModule, ButtonModule, AlertModule, ToastModule, PaginationModule, TableModule, SpinnerModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
@NgModule({
  imports: [
    CommonModule,
    ShiftRoutingModule,
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
    TooltipModule
  ],
  declarations: [ShiftComponent]
})
export class ShiftModule { }
