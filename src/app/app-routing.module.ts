import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';
import { Page404Component } from './views/pages/page404/page404.component';
import { Page500Component } from './views/pages/page500/page500.component';
import { LoginComponent } from './views/pages/login/login.component';
import { RegisterComponent } from './views/pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      // just super admin can access this route
      {
        path: 'groups',
        loadChildren: () =>
          import('./views/group/group.module').then((m) => m.GroupModule)
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./views/pages/pages.module').then((m) => m.PagesModule)
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./views/profile/profile.module').then((m) => m.ProfileModule)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule)
      },
      // just super admin can access this route
      {
        path: 'roles',
        loadChildren: () =>
          import('./views/roles/roles.module').then((m) => m.RolesModule)
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('./views/department/department.module').then((m) => m.DepartmentModule)
      },
      {
        path: 'work-time',
        loadChildren: () =>
          import('./views/works/work-time/work-time.module').then((m) => m.WorkTimeModule)
      },
      {
        path: 'work-schedule',
        loadChildren: () =>
          import('./views/works/work-schedule/work-schedule.module').then((m) => m.WorkScheduleModule)
      },
      {
        path: 'shift',
        loadChildren: () =>
          import('./views/works/shift/shift.module').then((m) => m.ShiftModule)
      },
      {
        path: 'overtime',
        loadChildren: () =>
          import('./views/works/over-time/over-time.module').then((m) => m.OverTimeModule)
      },
      {
        path: 'break-time',
        loadChildren: () =>
          import('./views/works/break-time/break-time.module').then((m) => m.BreakTimeModule)
      },
      {
        path: 'break-time-logs',
        loadChildren: () =>
          import('./views/works/break-time-log/break-time-log.module').then((m) => m.BreakTimeLogModule)
      },
    ]
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
