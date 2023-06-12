import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formData = {
    email: '',
    password: '',
  };
  message = '';
  constructor(private loginService: LoginService) {}

  onSubmit() {
    this.loginService.login({ email: this.formData.email, password: this.formData.password }).subscribe((res: any) => {
      
      
      if (res.token) {
        // just get role and name
        localStorage.setItem('role_user', res.user.role_id);
        localStorage.setItem('group_user', res.user.group_id);
        localStorage.setItem('department_user', res.user.department_id);
        localStorage.setItem('x-access-token', res.token);
        window.location.href = '/#/dashboard';
      }
    }, (err) => {
      console.log(err.error);
      this.formData.password = '';
      this.message = err.error.error;
    });
  }

  checkLogin() {
    if (localStorage.getItem('x-access-token')) {
      window.location.href = '/#/dashboard';
    }
    history.pushState(null, '', '/#/login');
  }

  ngOnInit() {
    console.log(localStorage.getItem('x-access-token'));
    this.checkLogin();
  }
}
