import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/departments/department.service';
import Swal from 'sweetalert2';
import { cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  icons = { cilTrash, cilPencil, cilPlus };
  constructor(
    private department: DepartmentService,
    private user: UserService
  ) {}
  formData = {
    name: '',
    description: '',
    groupId: localStorage.getItem('group_user'),
  };
  msg = '';
  data: any;
  pages = 1;
  number: number = 1;
  total: number[] = [];
  dataUser: any;
  pagesUser = 1;
  numberUser: number = 1;
  totalUser: number[] = [];
  selectedIdsUser: number[] = [];
  selectAllUser: boolean = false;
  checkboxesUser: boolean[] = [];
  dataUser1: any;
  pagesUser1 = 1;
  numberUser1: number = 1;
  totalUser1: number[] = [];
  selectedIdsUser1: number[] = [];
  selectAllUser1: boolean = false;
  checkboxesUser1: boolean[] = [];
  getDepartmentbyId = {
    name: '',
    description: '',
    groupId: localStorage.getItem('group_user'),
  };
  selectedIds: number[] = [];
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  getIdDepartments: any[] = [];
  flag: any;
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
  // chon tat ca checkbox
  toggleSelectAllUser() {
    for (let i = 0; i < this.dataUser.length; i++) {
      this.checkboxesUser[i] = this.selectAllUser;
      if (this.selectAllUser == true) {
        this.selectedIdsUser.push(this.dataUser[i].id);
        document
          .getElementById('btnDeleteUser')
          ?.className.replace('disabled', '');
      } else {
        this.selectedIdsUser = [];
        this.selectedIdsUser1 = [];
      }
    }
    console.log(this.selectedIdsUser);
  }
  // Phương thức kiểm tra xem một checkbox có được chọn hay không
  isSelectedUser(id: number): boolean {
    return this.selectedIdsUser.includes(id);
  }
  getIdUser(id: any) {
    if (this.isSelectedUser(id)) {
      // Checkbox đã được chọn, hãy xóa khỏi danh sách
      this.selectedIdsUser = this.selectedIdsUser.filter(
        (itemId) => itemId !== id
      );
    } else {
      // Checkbox chưa được chọn, hãy thêm vào danh sách
      this.selectedIdsUser.push(id);
    }
  }
  getDepartments(page: any) {
    this.department.getAll(page, {}).subscribe(
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
      (err) => {
        console.log(err.error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Lỗi tải dữ liệu',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }
  previousPage() {
    if (this.pages > 1) {
      this.pages--;
      this.getDepartments(this.pages);
    }
  }

  nextPage() {
    if (this.pages < this.number) {
      this.pages++;
      this.getDepartments(this.pages);
    }
  }
  preiousPageUser() {
    if (this.pagesUser > 1) {
      this.pagesUser--;
      this.getUsers(this.pagesUser);
    }
  }
  nextPageUser() {
    if (this.pagesUser < this.numberUser) {
      this.pagesUser++;
      this.getUsers(this.pagesUser);
    }
  }
  getByID(id: any) {
    this.department.getById(id, {}).subscribe((res: any) => {
      this.getDepartmentbyId = res.data;
      localStorage.setItem('id_department', id);
      console.log(this.getDepartmentbyId);
    });
  }
  clear() {
    this.formData.name = '';
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
  onSubmit() {
    this.department.createDepartment(this.formData, {}).subscribe(
      (res: any) => {
        this.msg = res.message;
        document.getElementById('closeBtn')?.click();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Thêm thành công',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        this.getDepartments(this.pages);
        this.clear();
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Thêm thất bại',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }
  edit() {
    this.department
      .editDepartment(
        localStorage.getItem('id_department'),
        this.getDepartmentbyId,
        {}
      )
      .subscribe(
        (res: any) => {
          this.msg = res.message;
          this.getDepartments(this.pages);
          document.getElementById('closeBtnEdit')?.click();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Cập nhật thành công',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        },
        (err) => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Cập nhật thất bại',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
          });
        }
      );
  }
  deleteDepartment(id: any) {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại dữ liệu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          this.department.deleteDepartment(id, {}).subscribe((res: any) => {
            this.msg = res.message;
            this.getDepartments(this.pages);
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Xóa thành công',
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Xóa thất bại',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }
  deleteDepartments() {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa?',
      text: 'Bạn sẽ không thể khôi phục lại dữ liệu!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then(
      (result) => {
        if (result.isConfirmed) {
          console.log(this.selectedIds);
          this.department
            .deleteSelected(this.selectedIds, {})
            .subscribe((res: any) => {
              // neu xoa o trang cuoi cung thi trang hien tai giam xuong 1
              if (this.pages == this.number) {
                this.previousPage();
              }
              this.getDepartments(this.pages);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Xóa thành công',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
              });
            });
        }
      },
      (err) => {
        this.selectedIds = [];
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Xóa thất bại',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  changeStatus(id: any, status: any) {
    if (status == 1) {
      this.flag = 0;
    } else {
      this.flag = 1;
    }
    this.department.changeStatus(id, this.flag, {}).subscribe(
      (res: any) => {
        this.msg = res.message;
        this.getDepartments(this.pages);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Cập nhật thành công',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Cập nhật thất bại',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }

  getUsers(page: any) {
    this.user.getByGroupAndNoDepartment(page, {}).subscribe((res: any) => {
      this.dataUser = res.data;
      this.pagesUser = res.page;
      if (this.pagesUser == 1) {
        document
          .getElementById('btnPreviousUser')
          ?.className.replace('disabled', 'disabled');
      }
      if (this.pagesUser == res.total) {
        document
          .getElementById('btnNextUser')
          ?.className.replace('disabled', '');
      }
      if (this.pagesUser > 1) {
        document
          .getElementById('btnPreviousUser')
          ?.className.replace('disabled', '');
      }
      if (this.pagesUser < res.total) {
        document
          .getElementById('btnNextUser')
          ?.className.replace('disabled', '');
      }
      // luu gia tri total de dung trong phan hien thi so trang
      for (let i = 1; i <= res.total; i++) {
        this.totalUser.push(i);
      }
      // neu phan tu bi trung thi xoa phan tu do
      this.totalUser = this.totalUser.filter((item, index) => {
        return this.totalUser.indexOf(item) === index;
      });
      // khi su dung chuc nang xoa thi phai xoa phan tu n - 1 trong mang total
      if (this.totalUser.length > res.total) {
        this.totalUser.splice(res.total, 1);
      }
      if (this.selectAllUser == true) {
        this.selectAllUser = false;
        this.selectedIdsUser = [];
      }
      this.selectedIdsUser1 = [];
      // luu total vao number de su dung trong phan hien thi so trang
      this.numberUser = res.total;
    });
  }

  addDepartmentInUser() {
    const id = this.selectedIds[0];
    this.user.addDepartmentIntoUser(id, this.selectedIdsUser, {}).subscribe(
      (res: any) => {
        this.msg = res.message;
        this.getUsers(this.pagesUser);
        this.getUsers1(this.pagesUser1);
        this.selectedIdsUser = [];
        this.selectedIdsUser1 = [];
        // neu them o trang cuoi cung thi trang hien tai giam xuong 1
        if (this.pagesUser == this.numberUser) {
          this.pagesUser--;
          this.getUsers1(this.pagesUser);
        }
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
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Thêm thất bại',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }

  // chon tat ca checkbox
  toggleSelectAllUser1() {
    for (let i = 0; i < this.dataUser1.length; i++) {
      this.checkboxesUser1[i] = this.selectAllUser1;
      if (this.selectAllUser1 == true) {
        this.selectedIdsUser1.push(this.dataUser1[i].id);
        document
          .getElementById('btnDeleteUser1')
          ?.className.replace('disabled', '');
      } else {
        this.selectedIdsUser1 = [];
      }
    }
  }
  // Phương thức kiểm tra xem một checkbox có được chọn hay không
  isSelectedUser1(id: number): boolean {
    return this.selectedIdsUser1.includes(id);
  }
  getIdUser1(id: any) {
    if (this.isSelectedUser1(id)) {
      // Checkbox đã được chọn, hãy xóa khỏi danh sách
      this.selectedIdsUser1 = this.selectedIdsUser1.filter(
        (itemId) => itemId !== id
      );
    } else {
      // Checkbox chưa được chọn, hãy thêm vào danh sách
      this.selectedIdsUser1.push(id);
    }
  }

  getUsers1(page: any) {
    this.user.getByGroupAndDepartment(page, {}).subscribe((res: any) => {
      this.dataUser1 = res.data;
      this.pagesUser1 = res.page;
      if (this.pagesUser1 == 1) {
        document
          .getElementById('btnPreviousUser1')
          ?.className.replace('disabled', 'disabled');
      }
      if (this.pagesUser1 == res.total) {
        document
          .getElementById('btnNextUser1')
          ?.className.replace('disabled', '');
      }
      if (this.pagesUser1 > 1) {
        document
          .getElementById('btnPreviousUser1')
          ?.className.replace('disabled', '');
      }
      if (this.pagesUser1 < res.total) {
        document
          .getElementById('btnNextUser1')
          ?.className.replace('disabled', '');
      }
      // luu gia tri total de dung trong phan hien thi so trang
      for (let i = 1; i <= res.total; i++) {
        this.totalUser1.push(i);
      }
      // neu phan tu bi trung thi xoa phan tu do
      this.totalUser1 = this.totalUser1.filter((item, index) => {
        return this.totalUser1.indexOf(item) === index;
      });
      // khi su dung chuc nang xoa thi phai xoa phan tu n - 1 trong mang total
      if (this.totalUser1.length > res.total) {
        this.totalUser1.splice(res.total, 1);
      }
      if (this.selectAllUser1 == true) {
        this.selectAllUser1 = false;
        this.selectedIdsUser1 = [];
      }
      this.selectedIdsUser = [];
      // luu total vao number de su dung trong phan hien thi so trang
      this.numberUser1 = res.total;
    });
  }

  deleteDepartmentInUser() {
    this.user.deleteDepartmentIntoUser(this.selectedIdsUser1, {}).subscribe(
      (res: any) => {
        this.msg = res.message;
        this.getUsers(this.pagesUser);
        this.getUsers1(this.pagesUser1);
        this.selectedIdsUser = [];
        this.selectedIdsUser1 = [];
        // neu xoa o trang cuoi cung thi trang hien tai giam xuong 1
        if (this.pagesUser1 == this.numberUser1) {
          this.pagesUser1--;
          this.getUsers1(this.pagesUser1);
        }
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Xóa thành công',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      },
      (err: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Xóa thất bại',
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }

  preiousPageUser1() {
    if (this.pagesUser1 > 1) {
      this.pagesUser1--;
      this.getUsers1(this.pagesUser1);
    }
  }

  nextPageUser1() {
    if (this.pagesUser1 < this.numberUser1) {
      this.pagesUser1++;
      this.getUsers1(this.pagesUser1);
    }
  }

  checkDisableUser() {
    if (this.selectedIds.length == 1) {
      if (this.selectedIdsUser.length > 0) {
        return false;
      }
    }
    return true;
  }
  ngOnInit() {
    this.getDepartments(this.pages);
    this.getUsers(this.pagesUser);
    this.getUsers1(this.pagesUser1);
    // this.getGroups();
  }
}
