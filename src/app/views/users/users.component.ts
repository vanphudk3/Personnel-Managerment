import { Component, OnInit } from '@angular/core';
import { cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { RoleService } from 'src/app/services/role.service';
import { RegisterService } from 'src/app/services/register.service';
import Swal from 'sweetalert2';
import { DepartmentService } from 'src/app/services/departments/department.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private users: UserService,
    private groups: GroupService,
    private roles: RoleService,
    private departments: DepartmentService
  ) {}
  icons = { cilTrash, cilPencil, cilPlus };
  role_user = localStorage.getItem('role_user');
  checkRole(role: any){
    if(role == this.role_user){
      return true;
    }
    return false;
  }
  formData = {
    name: '',
    phone: '',
    email: '',
    password: '',
    c_password: '',
    role: '',
    status: '1',
    group: '',
    department_id: '',
  };
  dataUser = {
    name: '',
    phone: '',
    email: '',
    password: '',
    role: '',
    group: '',
    department_id: '',
  };
  msgPW = '';
  msgEmail = '';
  msg: any;
  data: any;
  dataGroup: any;
  dataDepartment: any;
  dataRole: any;
  pages = 1;
  number: number = 1;
  total: number[] = [];
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  flag: any;
  checkPassword = true;
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
  cutstr(str: string, len: number) {
    if (str.length > len) {
      str = str.substring(0, len) + '...';
    }
    return str;
  }
  changeStatus(id: any, data: any) {
    if (data == '1') {
      this.flag = '0';
    } else {
      this.flag = '1';
    }
    this.users.changeStatus(id, this.flag, {}).subscribe(
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

  // bat su kien chi cho phep nhap so
  onKeyPress(event: any) {
    const inputChar = String.fromCharCode(event.keyCode || event.which);
    const pattern = /^[0-9\b]+$/; // Chỉ cho phép nhập số và ký tự backspace
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  // lay danh sach users theo page
  // getUsers() {
  //   this.users.getUsers({}).subscribe(
  //     (res) => {
  //       this.data = res;
  //       console.log(this.data);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }
  getUsers(page: any) {
    this.users.getUsers(page, {}).subscribe(
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
      this.getUsers(this.pages);
    }
  }

  nextPage() {
    if (this.pages < this.number) {
      this.pages++;
      this.getUsers(this.pages);
    }
  }
  // lay thong tin user theo id
  getUser(id: any) {
    this.LoadForm();
    this.users.getUser(id, {}).subscribe(
      (res: any) => {
        this.dataUser.name = res.name;
        this.dataUser.phone = res.phone;
        this.dataUser.email = res.email;
        this.dataUser.role = res.role;
        this.dataUser.group = res.group;
        this.dataUser.department_id = res.department_id;
        localStorage.setItem('idUser', id);
        console.log(res)
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // lay danh sach group
  getGroups() {
    this.groups.getGroupNotPaginate({}).subscribe(
      (res) => {
        this.dataGroup = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // lay danh danh sach department theo group
  getDepartments() {
    this.departments.getDepartmentNotPaginate({}).subscribe(
      (res) => {
        console.log(res);
        this.dataDepartment = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  // lay danh sach role loai bo superadmin
  getRoles() {
    this.roles.getRoleExSuperAdmin({}).subscribe(
      (res) => {
        this.dataRole = res;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.getUsers(this.pages);
  }

  LoadForm() {
    this.getGroups();
    this.getRoles();
    this.getDepartments();
  }

  clear(){
    this.formData.name = '';
    this.formData.phone = '';
    this.formData.email = '';
    this.formData.password = '';
    this.formData.c_password = '';
    this.formData.group = '';
    this.formData.role = '';
    this.msgEmail = '';
    this.msgPW = '';
    this.msg = '';
  }

  onSubmit() {
    console.log(this.formData);
    if (this.formData.password != this.formData.c_password) {
      this.msgPW = 'Mật khẩu không khớp';
      return;
    }
    this.msgPW = '';
    this.users.createUser(this.formData, {}).subscribe(
      (res: any) => {
        this.getUsers(this.pages);
        document.getElementById('closeBtn')?.click();
        this.clear();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      },
      (err: any) => {
        console.log(err.error);
        this.msgEmail = err.error.error;
        this.msg = err.error.errors;
      }
    );
  }
  // con bi loi khong sua duoc
  // sua user
  editUser() {
    this.users.editUser(localStorage.getItem('idUser'), this.dataUser, {}).subscribe(
      (res: any) => {
        this.getUsers(this.pages);
        document.getElementById('closeBtnEdit')?.click();
        this.clear();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Edit success',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      },
      (err: any) => {
        console.log(err);
        this.msg = err.error.errors;
      }
    );
  }

  // xoa user
  delete(id : any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result: any) => {
      if (result.value) {
        this.users.deleteUser(id, {}).subscribe(
          (res: any) => {
            // neu xoa o trang cuoi cung thi trang hien tai giam xuong 1
            if (this.pages == this.number) {
              this.previousPage();
            }
            this.ngOnInit();
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

  // xoa nhieu user
  deleteUsers(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result: any) => {
      if (result.value) {
        this.users.deleteSelected(this.selectedIds, {}).subscribe(
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
}
