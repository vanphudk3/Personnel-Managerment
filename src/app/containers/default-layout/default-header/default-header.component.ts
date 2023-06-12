import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LogoutService } from 'src/app/services/logout.service';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  constructor(private classToggler: ClassToggleService, private logout: LogoutService) {
    super();
  }

  sigout() {
    this.logout.logout({}).subscribe((res: any) => {
      localStorage.removeItem('role_user');
      localStorage.removeItem('group_user');
      localStorage.removeItem('x-access-token');
      window.location.href = '/#/login';
    });
  }
}
