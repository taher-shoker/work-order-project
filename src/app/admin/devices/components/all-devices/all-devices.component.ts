import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { DevicesService } from '../../services/devices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-devices',
  templateUrl: './all-devices.component.html',
  styleUrls: ['./all-devices.component.scss'],
})
export class AllDevicesComponent {
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;
  user_id: number = 0;

  private subject = new Subject<any>();
  constructor(
    private _DevicesService: DevicesService,
    private _ToastrService: ToastrService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.onGetAllDevices();
    this.subject.pipe(debounceTime(800)).subscribe({
      next: (res) => {
        this.onGetAllDevices();
      },
    });
  }
  onGetAllDevices() {
    let params = {
      page_size: this.pageSize,
      page: this.page,
      // userName: this.searchValue,
    };
    this.spinner.show();
    this._DevicesService.getAllDevices(params).subscribe({
      next: (res) => {
        this.tableResponse = res;
        this.tableData = res?.data;
        // console.log(this.tableResponse.meta.total);
        console.log(this.tableData);
        this.spinner.hide();
      },
      error: (err) => {},
      complete: () => {},
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.page = e.pageIndex + 1;
    this.onGetAllDevices();
  }
}
