import { NgModule } from '@angular/core';
import { BreakTimeLogComponent } from './break-time-log.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BreakTimeLogComponent,
    data: {
      title: 'Break Time Log',
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
export class BreakTimeLogRoutingModule { }
