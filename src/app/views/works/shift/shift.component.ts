import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../../../services/works/shift/shift.service';
import Swal from 'sweetalert2';
import {cilTrash, cilPencil, cilPlus} from '@coreui/icons';
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {
  icons = {cilTrash, cilPencil, cilPlus};
  constructor(private shiftsv: ShiftService) { }
  formData = {
    name: '',
    description: '',
    groupId: localStorage.getItem('group_user'),
    departmentId: '',
    start_time: '',
    end_time: '',
  };
  formDataUpdate = {
    name: '',
    description: '',
    groupId: localStorage.getItem('group_user'),
    departmentId: '',
    start_time: '',
    end_time: '',
  };
  msg = '';
  data: any;
  pages = 1;
  number: number = 1;
  total: number[] = [];
  getShiftbyId = {
    name: '',
    description: '',
    departmentId: '',
    start_time: '',
    end_time: '',
  };
  selectedIds: number[] = [];
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  getIdShifts: any[] = [];
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

  checkRole() {
    if (localStorage.getItem('role_user') == '1') {
      this.flag = true;
    } else {
      this.flag = false;
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

  getShifts(page: any) {
    this.shiftsv.getAll(page, {}).subscribe(
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
        console.log(err);
      }
    );
  }
  previousPage() {
    if (this.pages > 1) {
      this.pages--;
      this.getShifts(this.pages);
    }
  }

  nextPage() {
    if (this.pages < this.number) {
      this.pages++;
      this.getShifts(this.pages);
    }
  }
  getShift(id: any) {
    this.shiftsv.get(id, {}).subscribe(
      (res: any) => {
        this.getShiftbyId = res.data;
        this.formDataUpdate.name = this.getShiftbyId.name;
        this.formDataUpdate.description = this.getShiftbyId.description;
        this.formDataUpdate.departmentId = this.getShiftbyId.departmentId;
        this.formDataUpdate.start_time = this.getShiftbyId.start_time;
        this.formDataUpdate.end_time = this.getShiftbyId.end_time;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    this.shiftsv.create(this.formData, {}).subscribe(
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
        this.getShifts(this.pages);
        this.formData.name = '';
        this.formData.description = '';
        this.formData.departmentId = '';
        this.formData.start_time = '';
        this.formData.end_time = '';
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }

  onUpdate() {
    this.shiftsv.update(localStorage.getItem('id_department'), this.formDataUpdate, {}).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: res.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
        document.getElementById('closeBtnUpdate')?.click();
        this.getShifts(this.pages);
        this.formDataUpdate.name = '';
        this.formDataUpdate.description = '';
        this.formDataUpdate.departmentId = '';
        this.formDataUpdate.start_time = '';
        this.formDataUpdate.end_time = '';
      },
      (err) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500,
          toast: true,
        });
      }
    );
  }

  onDelete(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this shift!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shiftsv.delete(id, {}).subscribe(
          (res: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            this.getShifts(this.pages);
            if (this.data.length == 1) {
              this.pages--;
              this.getShifts(this.pages);
            }
          },
          (err) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
          }
        );
      }
    });
  }

  onDeleteAll() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this shift!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it.',
    }).then((result) => {
      if (result.isConfirmed) {
        this.shiftsv.deleteAll(this.selectedIds, {}).subscribe(
          (res: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: res.message,
              showConfirmButton: false,
              timer: 1500,
              toast: true,
            });
            this.getShifts(this.pages);
            this.selectedIds = [];
            this.selectAll = false;
            if (this.data.length == 1) {
              this.pages--;
              this.getShifts(this.pages);
            }
          },
          (err) => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: err.error.message,
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
  }

}
