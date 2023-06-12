import { NgModule } from '@angular/core';
import { WorkScheduleComponent } from './work-schedule.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: WorkScheduleComponent,
    data: {
      title: 'Work Schedule',
      icon: 'icon-layout-sidebar-left',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit',
      status: true
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkScheduleRoutingModule { }
