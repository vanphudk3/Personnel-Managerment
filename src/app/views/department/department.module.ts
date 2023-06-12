import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormModule, CardModule, GridModule, BadgeModule, ModalModule, ButtonModule, AlertModule, ToastModule, PaginationModule, TableModule, SpinnerModule, TooltipModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { DepartmentRoutingModule } from './department-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { IconSetService } from '@coreui/icons-angular';
@NgModule({
  imports: [
    CommonModule,
    DepartmentRoutingModule,
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
  declarations: [DepartmentComponent],
  providers: [IconSetService]
})
export class DepartmentModule { }
