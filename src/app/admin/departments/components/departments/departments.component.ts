import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DepartmentService } from '../../services/department.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddDepartmentComponent } from '../add-department/add-department.component';
import { FormGroup } from '@angular/forms';
import { EditDepartmentComponent } from '../edit-department/edit-department.component';
import { PageEvent } from '@angular/material/paginator';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent {

   private subject = new Subject<any>;
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 100;
  page: number | undefined = 1;
  pageIndex: number = 0;

  constructor(
    private _DepartmentService: DepartmentService,
    private spinner: NgxSpinnerService,
    private _ToastrService: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllDepartments();
    this.subject.pipe((debounceTime(800))).subscribe({
      next: (res) => {
        this.getAllDepartments()
      },
    })
  }

  // all Departments
  getAllDepartments() {
    this.spinner.show()
    this._DepartmentService.getDepartment().subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        this.spinner.hide()
      }
    });
  }
  // add Department
  openAddDepartment() {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      data: this.tableData
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDepartment(result)
      }
    });
  }

  addDepartment(data: FormGroup) {
    this._DepartmentService.addDepartment(data.value).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Department Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Department');
      },
      complete: () => {
        this.getAllDepartments()
      }

    })
  }

  // edit Department
  openEditDepartment(id: number) {
    const dialogRef = this.dialog.open(EditDepartmentComponent, {
      data: id
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editDepartment(result, id)
      }
    });
  }

  editDepartment(data: FormGroup, id: number) {
    this._DepartmentService.editDepartment(data.value, id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Department Update Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Update Department');
      },
      complete: () => {
        this.getAllDepartments()
      }

    })
  }

  // pagination
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.getAllDepartments();
  }

  // delete department
  deleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteItem(result.id)
      }
    });
  }
  deleteItem(id: number) {
    this._DepartmentService.deleteDepartment(id).subscribe({
      next: (res) => {
        this._ToastrService.success('Department Deleted')
      },
      error: (err) => {
        this._ToastrService.error('Delete Department Failed')
      },
      complete: () => {
        this.getAllDepartments();
      }
    })
  }

}
