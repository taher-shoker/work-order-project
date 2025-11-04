import { Component } from '@angular/core';
import { WorkOrdersService } from '../../services/work-orders.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ReportsService } from 'src/app/admin/reports/services/reports.service';
import { PageEvent } from '@angular/material/paginator';
import { LookupsService } from 'src/app/services/lookups.service';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent {
  status: any
  departments: any
  engineers: any
  technicians: any
  workTypeList: any
  buildingsList: any
  isEmptyData: boolean = false

  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;
  currentLang = localStorage.getItem('lang')

  hideRequiredMarker: boolean = true;

  constructor(
    private _ReportsService: ReportsService,
    private _LookupsService: LookupsService,
    private _WorkOrdersService: WorkOrdersService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // for get all work orders first
    Object.entries(this.reportForm.value).forEach(([key, value]) => {
      if (!value) {
        this.isEmptyData = true
      }
    })

    if (this.isEmptyData == true) {
      this.onSubmit(this.reportForm)
    }
    this.getDepartment()
    this.getAllStatus()
    this.getEngineers()
    this.getTechnicians()
    this.getBuildings()
    this.getWorkType()
  }

  reportForm = new FormGroup(
    {
      status: new FormControl(0),
      department_id: new FormControl(null),
      engineer_id: new FormControl(null),
      technician_id: new FormControl(null),
      building_id: new FormControl(null),
      work_type_id: new FormControl(null),
      from_date: new FormControl(null),
      to_date: new FormControl(null)
    }
  );


  onSubmit(data: FormGroup) {
    let params = {
      page_size: this.pageSize,
      page: this.page,
    };
    this.spinner.show()

    this._ReportsService.addReports(data.value, params).subscribe({
      next: (res) => {
        this.tableResponse = res
        this.tableData = this.tableResponse.data

        this._ToastrService.success('Report Added Succesfuly');
      },
      error: (err) => {
        this._ToastrService.error(
          err.message,
          'Error in Add  Report'
        );
      },
      complete: () => {

      }
    })
  }

  // Status
  getAllStatus() {
    this._ReportsService.getStatus().subscribe(
      (res) => {
        this.status = res.data
      }
    )
  }
  // Department
  getDepartment() {
    this._LookupsService.getDepartment().subscribe(
      (res) => {
        this.departments = res.data
      }
    )
  }
  // Engineers
  getEngineers() {
    this._ReportsService.getEngineers().subscribe(
      (res) => {
        this.engineers = res.data;
      }
    )
  }
  // Technicians
  getTechnicians() {
    this._ReportsService.getTechnicians().subscribe(
      (res) => {
        this.technicians = res.data;
      }
    )
  }
  // buildings
  getBuildings() {
    this._ReportsService.getBuildings().subscribe({
      next: (res) => {
        this.buildingsList = res.data
      }
    })
  }
  // WorkType
  getWorkType() {
    this._ReportsService.getWorkType().subscribe({
      next: (res) => {
        this.workTypeList = res.data
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize
    this.page = e.pageIndex + 1
    this.onSubmit(this.reportForm);
  }

  deleteDialog(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.deleteItem(result.id)
        this.onSubmit(this.reportForm);
      }
    });
  }
  deleteItem(id: number) {
    this._WorkOrdersService.deleteOrder(id).subscribe({
      next: (res) => {
      },
      error: (err) => {
        this._ToastrService.error('delete order failed')
      },
      complete: () => {
        this.onSubmit(this.reportForm)
        this._ToastrService.success('Order Deleted')

      }
    })
  }

  // deleteItem(id: number) {
  //   this._WorkOrdersService.deleteOrder(id).subscribe({
  //     next: (res) => {
  //     },
  //     error: (err) => {
  //       this._ToastrService.error('delete order failed')
  //     },
  //     complete: () => {
  //       this._ToastrService.success('Order Deleted')
  //     }
  //   })
  // }

  openOrderDialog(id: any) {
    // console.log(id);
        // this.getOrder(id)

    const dialogRef = this.dialog.open(ViewComponent, {
      data: id,
      width: '60%',
      height: '95%'

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.getOrder(id)
      }
    });
  }


}
