import { Component, OnInit } from '@angular/core';
import { cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import Swal from 'sweetalert2';
import { WorkScheduleService } from '../../../services/works/work-schedule/work-schedule.service';
import { DepartmentService } from 'src/app/services/departments/department.service';
@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css']
})
export class WorkScheduleComponent implements OnInit {
  icons = { cilTrash, cilPencil, cilPlus };
  constructor(private workSchedule: WorkScheduleService, private department: DepartmentService) { }
  formData = {
    date: '',
    departmentId: '',
    groupId: localStorage.getItem('group_user'),
  };
  formDataUpdate = {
    date: '',
    departmentId: '',
    groupId: localStorage.getItem('group_user'),
  };
  visible = false;
  msg = '';
  data: any;
  dataDepartment: any;
  pages = 1;
  number: number = 1;
  total: number[] = [];
  getWorkSchedulebyId = {
    name: '',
    description: '',
    groupId: localStorage.getItem('group_user'),
  };
  selectedIds: number[] = [];
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  getIdWorkSchedules: any[] = [];
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
    this.visible = !this.visible;
    if (this.isSelected(id)) {
      // Checkbox đã được chọn, hãy xóa khỏi danh sách
      this.selectedIds = this.selectedIds.filter((itemId) => itemId !== id);
    } else {
      // Checkbox chưa được chọn, hãy thêm vào danh sách
      this.selectedIds.push(id);
    }
  }

  formatDateTime(date: any) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    let hour = '' + d.getHours();
    let minute = '' + d.getMinutes();
    let second = '' + d.getSeconds();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2)
      day = '0' + day;
    if (hour.length < 2)
      hour = '0' + hour;
    if (minute.length < 2)
      minute = '0' + minute;
    if (second.length < 2)
      second = '0' + second;
    return [day, month, year].join('-') + ' ' + [hour, minute, second].join(':');
  }

  checkRole() {
    if (localStorage.getItem('role_user') == '1') {
      return true;
    }
    return false;
  }

  formatDate(date: any) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2)
      day = '0' + day;
    return [day, month, year].join('-');
  }

  // format date yyyy-MM-dd
  formatDate2(date: any) {
    let d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  getWorkSchedules(page: any) {
    this.workSchedule.getAll(page, {}).subscribe(
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
      (error) => {
        console.log(error);
      }
    );
  }
  previousPage() {
    if (this.pages > 1) {
      this.pages--;
      this.getWorkSchedules(this.pages);
    }
  }

  nextPage() {
    if (this.pages < this.number) {
      this.pages++;
      this.getWorkSchedules(this.pages);
    }
  }

  getWorkScheduleById(id: any) {
    this.getDepartmentById();
    this.workSchedule.get(id, {}).subscribe(
      (res: any) => {
        this.formDataUpdate.date = this.formatDate2(res.data.date);
        this.formDataUpdate.departmentId = res.data.department_id;
        localStorage.setItem('id_workSche', id);
        console.log(this.formDataUpdate);
      }
    );
  }

  getDepartmentById() {
    this.department.getDepartmentNotPaginate({}).subscribe(
      (res: any) => {
        this.dataDepartment = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  edit() {
    this.workSchedule.update(localStorage.getItem('id_workSche'), this.formDataUpdate, {}).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        document.getElementById('closeBtnEdit')?.click();
        this.getWorkSchedules(this.pages);
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }
    

  onSubmit() {
    this.workSchedule.create(this.formData, {}).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        document.getElementById('closeBtn')?.click();
        this.getWorkSchedules(this.pages);
        this.formData.departmentId = '';
        this.formData.date = '';
      },
      (error) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: error.error.error,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  }

  delete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this work schedule!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.workSchedule.delete(id, {}).subscribe(
          (res: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            this.getWorkSchedules(this.pages);
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.error,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
      }
    });
  }

  deleteSelected() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover these work schedules!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete them!',
      cancelButtonText: 'No, keep them.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.workSchedule.deleteAll(this.selectedIds, {}).subscribe(
          (res: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            this.getWorkSchedules(this.pages);
            this.selectedIds = [];
            this.selectAll = false;
          },
          (error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: error.error.error,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
      }
    });
  }

  ngOnInit() {
    this.getWorkSchedules(this.pages);
  }

}
