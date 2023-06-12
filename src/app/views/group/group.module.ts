import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRoutingModule } from './group-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, GridModule, ModalModule, PaginationModule, TableModule, ToastModule } from '@coreui/angular';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { SpinnerModule } from '@coreui/angular';
import { TooltipModule } from '@coreui/angular';

@NgModule({
  imports: [
    CommonModule,
    GroupRoutingModule,
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
  declarations: [GroupComponent],
  providers: [IconSetService]
})
export class GroupModule { }
