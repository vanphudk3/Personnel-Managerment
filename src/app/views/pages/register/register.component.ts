import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { RoleService } from '../../../services/role.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPW: '',
    role: 0,
  }
  roleData: any;
  msgname = '';
  msgemail = '';
  msgphone = '';
  msgpw = '';
  msgcpw = '';
  msg = '';
  errors: any;
  constructor(private rt: RegisterService, private role: RoleService) { }
  ngOnInit(): void {
    this.role.getRoles({}).subscribe((res: any) => {
      this.roleData = res;
    });
    console.log(this.formData);
  }

  static email(control: AbstractControl<any, any>): ValidationErrors | null
  {
    const email = control.value;
    if (email === '') {
      return null;
    }
    if (email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      return null;
    }
    return {email: true};
  }

  validator(){
    if (this.formData.name == '') {
      this.msgname = 'Name is required';
      // return;
    }
    if (this.formData.email == '') {
      this.msgemail = 'Email is required';
      // return;
    }
    if (RegisterComponent.email({value: this.formData.email} as AbstractControl<any, any>) !== null) {
      this.msg = 'Email is invalid';
      // return;
    }
    if (this.formData.phone == '') {
      this.msgphone = 'Phone is required';
      // return;
    }
    if (this.formData.password == '') {
      this.msgpw = 'Password is required';
      // return;
    }
    if (this.formData.password != this.formData.confirmPW) {
      this.msgcpw = 'Password and Confirm Password are not matched';
      // return;
    }
    if (this.formData.role == 0) {
      this.msg = 'Role is required';
      // return;
    }
    return false;
  }

  onSubmit() {
    // if (this.validator()) {
    //   return;
    // }
    this.rt.register(this.formData).subscribe((res: any) => {
      window.location.href = '/#/dashboard';
    }, (err: any) => {
      this.errors = err.error.errors;
    });
  }

}
