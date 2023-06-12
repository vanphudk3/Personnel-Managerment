import { NgModule } from '@angular/core';
import { BreakTimeComponent } from './break-time.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BreakTimeComponent,
    data: {
      title: 'Break Time',
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
export class BreakTimeRoutingModule { }
