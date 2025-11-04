import { Component } from '@angular/core';
import { ReportsService } from '../../services/reports.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from 'src/app/services/helper.service';
import { LookupsService } from 'src/app/services/lookups.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  data: any
  status: any
  departments: any
  departmentId: any
  supervisor: any
  engineers: any
  technicians: any
  start_date: any
  date: any
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  isEmptyData: boolean = false
  currentLang = localStorage.getItem('lang')

  hide: boolean = true;
  confirmHide: boolean = true;
  hideRequiredMarker: boolean = true;

  constructor(
    private _ReportsService: ReportsService,
    private _LookupsService: LookupsService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _HelperService: HelperService
  ) { }

  ngOnInit() {
    // // for get all work orders first
    // Object.entries(this.reportForm.value).forEach(([key, value]) => {
    //   if (!value) {
    //     this.isEmptyData = true
    //   }
    // })

    // if (this.isEmptyData == true) {
    //   this.onSubmit(this.reportForm)
    // }
    this.getDepartment()
    this.getAllStatus()
    this.getEngineers()
    this.getTechnicians()
  }

  reportForm = new FormGroup(
    {
      status: new FormControl(0),
      department_id: new FormControl(null),
      engineer_id: new FormControl(null),
      technician_id: new FormControl(null),
      from_date: new FormControl(null),
      to_date: new FormControl(null)
    }
  );

  onSubmit(data: FormGroup) {
 let params = {
      page_size: this.pageSize,
      page: this.page,
    };
    // this.spinner.show()

    this._ReportsService.addReports(data.value,params).subscribe({
      next: (res) => {
        this.data = res.data

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


}
