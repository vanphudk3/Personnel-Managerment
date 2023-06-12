import { INavData } from '@coreui/angular';
let navItems: INavData[] = [];
if (localStorage.getItem('role_user') === 'superadmin' || localStorage.getItem('role_user') === '4') {
  navItems = [
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
      iconComponent: { name: 'cil-user-follow' },
    },
    {
      name: 'User Logs',
      url: '/user-logs',
      iconComponent: { name: 'cil-reload' },
    },
    {
      name: 'Group',
      title: true
    },
    {
      name: 'Group',
      url: '/groups',
      iconComponent: { name: 'cil-puzzle' },
    },
  ];
} else if (localStorage.getItem('role_user') === 'admin' || localStorage.getItem('role_user') === '1') {
  navItems = [
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
      name: 'User'
    },
    {
      name: 'Privilege',
      url: '/roles',
      iconComponent: { name: 'cil-user' },
    },
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
  ];
} else {
  navItems = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
  ];
}

export default navItems;
  
