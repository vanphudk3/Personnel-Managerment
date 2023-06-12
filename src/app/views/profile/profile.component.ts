import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  };
  formData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
  };
  formPW = { 
    oldPW: '', 
    newPW: '', 
    confirmPW: ''
  };
  msgName = '';
  msgEmail = '';
  msgPhone = '';
  msg = '';
  constructor(private user: UserService) { }
  getProfile() {
    this.user.profile({}).subscribe((res: any) => {
      res.map((item: any) => {
        this.data.name = item.name;
        this.data.email = item.email;
        this.data.phone = item.phone;
        this.data.password = item.password;
        this.data.role = item.role;

        this.formData.name = item.name;
        this.formData.email = item.email;
        this.formData.phone = item.phone;
        this.formData.password = item.password;
        this.formData.role = item.role;
      });
    });
  }
  
  
  ngOnInit() {
    this.user.checkLogin();
    this.getProfile();
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

  static numberOnlyValidator(control: AbstractControl<any>): ValidationErrors | null 
  {
    const inputValue = control.value;
    const numberPattern = /^[0-9]*$/;
    
    if (inputValue === '') {
      return null;
    }
    
    if (numberPattern.test(inputValue)) {
      return null;
    }
    
    return { numberOnly: true };
  }


  closeDialog(): void {
    document.getElementById('btnsub')?.click();
  }
  
  editName() {
    if (this.formData.name.length < 5) {
      this.msgName = 'Name is too short';
      return;
    }
    this.user.editName({name: this.formData.name},{}).subscribe((res: any) => {
      this.data = res;
      document.getElementById('btnsubname')?.click();
      this.ngOnInit();
    });
  }

  editEmail() {
    if (this.formData.email === '') {
      this.msgEmail = 'Email is required';
      return;
    }
    if (ProfileComponent.email({value: this.formData.email} as AbstractControl<any, any>) !== null) {
      this.msgEmail = 'Email is invalid';
      return;
    }
    this.user.editEmail({email: this.formData.email},{}).subscribe((res: any) => {
      this.data = res;
      document.getElementById('btnsubemail')?.click();
      this.ngOnInit();
    });
  }

  editPassword() {
    console.log(this.formPW);
    if (this.formPW.newPW !== this.formPW.confirmPW) {
      this.msg = 'Confirm password is incorrect';
      return;
    }
    this.data.password = this.formPW.newPW;
    this.user.editPassword({password_new: this.formPW.newPW, password_old: this.formPW.oldPW},{}).subscribe((res: any) => {
      this.data = res;
      document.getElementById('btnsubpw')?.click();
      this.ngOnInit();
    }, (err: any) => {
      this.msg = err.error.error;
    });
  }

  editPhone() {
    if (this.formData.phone === '') {
      this.msgPhone = 'Phone is required';
      return;
    }
    if (ProfileComponent.numberOnlyValidator({value: this.formData.phone} as AbstractControl<any>) !== null) {
      this.msgPhone = 'Phone is invalid';
      return;
    }

    this.user.editPhone({phone: this.formData.phone},{}).subscribe((res: any) => {
      this.data = res;
      document.getElementById('btnsubphone')?.click();
      this.ngOnInit();
    });
  }
  
}
