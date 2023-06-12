import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: "",
        component: DepartmentComponent,
        data: {
            title: 'Department',
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DepartmentRoutingModule { }
