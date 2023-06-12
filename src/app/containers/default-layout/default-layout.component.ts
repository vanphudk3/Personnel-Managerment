import { Component } from '@angular/core';

import navItems from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent {
  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {}
  // load _nav.ts follow role
  ngOnInit(): void {
    if (localStorage.getItem('role_user') == '4')
    {
      this.navItems = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          iconComponent: { name: 'cil-speedometer' },
          badge: {
            color: 'info',
            text: 'NEW'
          }
        },
        {
          title: true,
          name: 'Users'
        },
        {
          name: 'Privilege',
          url: '/roles',
          iconComponent: { name: 'cil-user' },
        },
        {
          name: 'User Account',
          url: '/users',
          iconComponent: { name: 'cil-people' },
        },
        {
          name: 'User Logs',
          url: '/user-logs',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Group',
          title: true
        },
        {
          name: 'Group',
          url: '/groups',
          iconComponent: { name: 'cil-library-building' },
        },
      ];
    }
    else if (localStorage.getItem('role_user') == '1')
    {
      this.navItems = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          iconComponent: { name: 'cil-speedometer' },
          badge: {
            color: 'info',
            text: 'NEW'
          }
        },
        {
          title: true,
          name: 'Users'
        },
        // {
        //   name: 'Privilege',
        //   url: '/roles',
        //   iconComponent: { name: 'cil-user' },
        // },
        {
          name: 'User Account',
          url: '/users',
          iconComponent: { name: 'cil-user' },
        },
        {
          name: 'Departments',
          title: true
        },
        {
          name: 'Department',
          url: '/departments',
          iconComponent: { name: 'cil-puzzle' },
        },
        {
          name: 'Works',
          title: true
        },
        {
          name: 'Work Schedule',
          url: '/work-schedule',
          iconComponent: { name: 'cil-calendar' },
        },
        // {
        //   name: 'Shift',
        //   url: '/shift',
        //   iconComponent: { name: 'cil-spreadsheet' },
        // },
        {
          name: 'Work Time',
          url: '/work-time',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Overtime',
          url: '/overtime',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Break Time',
          url: '/break-time',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Break Time Logs',
          url: '/break-time-logs',
          iconComponent: { name: 'cil-spreadsheet' },
        },
      ];
    }
    else if (localStorage.getItem('role_user') == '2')
    {
      this.navItems = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          iconComponent: { name: 'cil-speedometer' },
          badge: {
            color: 'info',
            text: 'NEW'
          }
        },
        {
          title: true,
          name: 'Works'
        },
        {
          name: 'Work Time',
          url: '/work-time',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Overtime',
          url: '/overtime',
          iconComponent: { name: 'cil-plus' },
        },
        {
          name: 'Break Time',
          url: '/break-time',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Break Time Logs',
          url: '/break-time-logs',
          iconComponent: { name: 'cil-spreadsheet' },
        },
      ];
    }
    else {
      this.navItems = [
        {
          name: 'Dashboard',
          url: '/dashboard',
          iconComponent: { name: 'cil-speedometer' },
          badge: {
            color: 'info',
            text: 'NEW'
          }
        },
        {
          title: true,
          name: 'Works'
        },
        {
          name: 'Work Schedule',
          url: '/work-schedule',
          iconComponent: { name: 'cil-calendar' },
        },
        // {
        //   name: 'Shift',
        //   url: '/shift',
        //   iconComponent: { name: 'cil-layers' },
        // },
        {
          name: 'Work Time',
          url: '/work-time',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Overtime',
          url: '/overtime',
          iconComponent: { name: 'cil-calendar' },
        },
        {
          name: 'Break Time',
          url: '/break-time',
          iconComponent: { name: 'cil-calendar' },
        },
      ];
    }
  }
}
