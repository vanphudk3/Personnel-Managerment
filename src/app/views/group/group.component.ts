import { Component, OnInit, ViewChild } from '@angular/core';
import { GroupService } from '../../services/groups/group.service';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import {
  cilTrash,
  cilPencil,
  cilPlus,
} from '@coreui/icons';
import { DefaultFooterComponent } from '../../containers/default-layout/default-footer/default-footer.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
})
export class GroupComponent implements OnInit {
  today: number = Date.now();
  getTodayFormatVN = new Date(this.today).toLocaleDateString('en-GB');
  icons = { cilTrash, cilPencil, cilPlus };
  formData = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    date: this.getTodayFormatVN,
  };
  msg = '';

  data: any;
  pages = 1;
  number: number = 1;
  total: number[] = [];
  getGroupbyId = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    date: '',
  };
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  getIdGroups: any[] = [];
  flag: any;
  constructor(private group: GroupService, private user: UserService) {}
  onKeyPress(event: any) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    const pattern = /^[0-9\b]+$/; // Chỉ cho phép nhập số và ký tự backspace

    if (!pattern.test(inputChar)) {
      // Nếu giá trị nhập không phải là số thì sẽ không cho nhập
      event.preventDefault();
    }
  }
  // Mảng các ID của các checkbox đã chọn
  selectedIds: number[] = [];
  // chon tat ca checkbox
  toggleSelectAll() {
    for (let i = 0; i < this.data.length; i++) {
      this.checkboxes[i] = this.selectAll;
      if (this.selectAll == true) {
        this.selectedIds.push(this.data[i].id);
        document.getElementById('btnDelete')?.className.replace('disabled', '');
      } else {
        this.selectedIds = [];
      }
    }
    console.log(this.selectedIds);
  }
  
  // Phương thức kiểm tra xem một checkbox có được chọn hay không
  isSelected(id: number): boolean {
    return this.selectedIds.includes(id);
  }
  
  getId(id: any) {
    if (this.isSelected(id)) {
      // Checkbox đã được chọn, hãy xóa khỏi danh sách
      this.selectedIds = this.selectedIds.filter((itemId) => itemId !== id);
    } else {
      // Checkbox chưa được chọn, hãy thêm vào danh sách
      this.selectedIds.push(id);
    }
  }

  getGroups(page: any) {
    this.group.getGroups(page, {}).subscribe(
      (res: any) => {
        this.data = res.data;
        this.pages = res.page;
        if (this.pages == 1) {
          document
            .getElementById('btnPrevious')
            ?.className.replace('disabled', 'disabled');
        }
        if (this.pages == res.total) {
          document.getElementById('btnNext')?.className.replace('disabled', '');
        }
        if (this.pages > 1) {
          document
            .getElementById('btnPrevious')
            ?.className.replace('disabled', '');
        }
        if (this.pages < res.total) {
          document.getElementById('btnNext')?.className.replace('disabled', '');
        }
        // luu gia tri total de dung trong phan hien thi so trang
        for (let i = 1; i <= res.total; i++) {
          this.total.push(i);
        }
        // neu phan tu bi trung thi xoa phan tu do
        this.total = this.total.filter((item, index) => {
          return this.total.indexOf(item) === index;
        });
        // khi su dung chuc nang xoa thi phai xoa phan tu n - 1 trong mang total
        if (this.total.length > res.total) {
          this.total.splice(res.total, 1);
        }
        if (this.selectAll == true) {
          this.selectAll = false;
          this.selectedIds = [];
        }
        // luu total vao number de su dung trong phan hien thi so trang
        this.number = res.total;
      },
      (err: any) => {
        console.log(err.error.error);
      }
    );
  }

  previousPage() {
    if (this.pages > 1) {
      this.pages--;
      this.getGroups(this.pages);
    }
  }

  nextPage() {
    if (this.pages < this.number) {
      this.pages++;
      this.getGroups(this.pages);
    }
  }

  ngOnInit() {
    this.getGroups(this.pages);
  }

  clear() {
    this.formData.name = '';
    this.formData.address = '';
    this.formData.phone = '';
    this.formData.email = '';
    this.formData.website = '';
    this.formData.description = '';
    this.msg = '';
  }


  cutstr(str: any, len: any) {
    let temp;
    if (str === null) {
      return '';
    }
    if (str.length > len) {
      temp = str.substring(0, len);
      temp += '...';
    } else {
      temp = str;
    }
    return temp;
  }

  onsubmit() {
    this.group.createGroup(this.formData, {}).subscribe(
      (res: any) => {
        document.getElementById('closeBtn')?.click();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Group has been created',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        this.ngOnInit();
        // this.footer?.show();
        this.clear();
      },
      (err: any) => {
        this.msg = err.error.error;
      }
    );
  }

  openModal(id: any) {
    this.group.getGroup(id, {}).subscribe(
      (res: any) => {
          this.getGroupbyId.name = res.name;
          this.getGroupbyId.address = res.address;
          this.getGroupbyId.phone = res.phone;
          this.getGroupbyId.email = res.email;
          this.getGroupbyId.website = res.website;
          this.getGroupbyId.description = res.description;
        localStorage.setItem('idGroup', id);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  edit() {
    if (localStorage.getItem('idGroup')) {
      this.group
        .editGroup(localStorage.getItem('idGroup'), this.getGroupbyId, {})
        .subscribe(
          (res: any) => {
            document.getElementById('closeBtnEdit')?.click();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Group has been updated',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            this.getGroups(this.pages);
            localStorage.removeItem('idGroup');
          },
          (err: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.error,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
    }
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result: any) => {
      if (result.value) {
        this.group.deleteGroup(id, {}).subscribe(
          (res: any) => {
            // neu xoa o trang cuoi cung thi trang hien tai giam xuong 1
            if (this.pages == this.number) {
              this.previousPage();
            }
            this.ngOnInit();
            // sau khi xoa thi clear mang selectedIds
            this.selectedIds = [];
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            );
          },
          (err: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.error,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
      }
    });
  }

  deleteGroups() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result: any) => {
      if (result.value) {
        this.group.deleteSelected(this.selectedIds, {}).subscribe(
          (res: any) => {
            // neu xoa o trang cuoi cung thi trang hien tai giam xuong 1
            if (this.pages == this.number) {
              this.previousPage();
            }
            this.ngOnInit();
            // sau khi xoa thi clear mang selectedIds
            this.selectedIds = [];
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your imaginary file has been deleted.',
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          },
          (err: any) => {
            this.selectedIds = [];
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.error,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
      }
    });
  }

  changeStatus(id: any, data: any) {
    if (data == '1') {
      this.flag = '0';
    } else {
      this.flag = '1';
    }
    this.group.changeStatus(id, this.flag, {}).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Status has been changed',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        this.ngOnInit();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
