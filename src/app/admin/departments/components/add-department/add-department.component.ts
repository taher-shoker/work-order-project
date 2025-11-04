import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/admin/services/users.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {

  currentLang = localStorage.getItem('lang')
  hideRequiredMarker: boolean = true
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _UsersService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers()
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


}
