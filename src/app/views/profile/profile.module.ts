import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DocsComponentsModule } from '../../../components/docs-components.module';
import { CardModule, GridModule, BadgeModule } from '@coreui/angular';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalModule } from '@coreui/angular';
import { ButtonModule } from '@coreui/angular';
import { FormModule } from '@coreui/angular';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AlertModule } from '@coreui/angular';
import { ToastModule } from '@coreui/angular';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        DocsComponentsModule,
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
        FormModule,
        FormsModule,
        MatFormFieldModule,
        AlertModule,
        ToastModule
    ]
})
export class ProfileModule {
}