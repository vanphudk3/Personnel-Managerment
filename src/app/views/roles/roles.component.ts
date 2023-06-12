import { Component, OnInit } from '@angular/core';
import { cilTrash, cilPencil, cilPlus } from '@coreui/icons';
import Swal from 'sweetalert2';
import { RoleService } from 'src/app/services/role.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  icons = { cilTrash, cilPencil, cilPlus };
  data: any;
  selectAll: boolean = false;
  checkboxes: boolean[] = [];
  constructor(
    private roleService: RoleService,
  ) {}

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

  getRoles() {
    this.roleService.getRoles({}).subscribe((res: any) => {
      this.data = res;
      console.log(this.data);
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }

}
