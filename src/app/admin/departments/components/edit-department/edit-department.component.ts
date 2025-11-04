import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/admin/services/users.service';
import { DepartmentService } from '../../services/department.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.scss']
})
export class EditDepartmentComponent {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;
  departmentData: any;

  constructor(
    public dialogRef: MatDialogRef<EditDepartmentComponent>, private _DepartmentsService: DepartmentService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _UsersService: UsersService, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.getDepartmentById(this.data);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  departmentForm = new FormGroup({
    id: new FormControl(this.data),
    name_en: new FormControl(null, [Validators.required]),
    name_ar: new FormControl(null, [Validators.required]),
    maintenance_supervisor_id: new FormControl(null, [Validators.required]),
  })

  getAllUsers() {
    let params = {
      pageSize: this.pageSize,
      page: this.page
    }
    this._UsersService.getAllUsers(params).subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      }
    })
  }

  getDepartmentById(id: number) {
    this._DepartmentsService.getDepartmentById(id).subscribe({
      next: (res) => {
        this.departmentData = res.data;

      }, error: (err) => {
        this._ToastrService.error(err.message, 'Department id Failed')
      }, complete: () => {
        this.departmentForm.patchValue({
          name_en: this.departmentData?.name_en,
          name_ar: this.departmentData?.name_ar,
          maintenance_supervisor_id: this.departmentData?.maintenance_supervisor?.id
        })
      }
    })
  }


}
