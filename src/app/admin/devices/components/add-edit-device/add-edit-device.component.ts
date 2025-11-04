import { Component } from '@angular/core';
import { DevicesService } from '../../services/devices.service';
import { LookupsService } from 'src/app/services/lookups.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.scss']
})
export class AddEditDeviceComponent {
  currentLang = localStorage.getItem('lang');

  isUpdatePage: boolean = false;
  hideRequiredMarker: boolean = true;
  deviceId: any;
  currentDevice: any;
  departments: any;
  departmentId: any;
  devicesModel: any;
  modelId: any;
  manufacturers: any;
  manufacturersId: any;
  deviceTypes: any;
  typeId: any;
  custodiansList: any;
  custodiansId: any;
  deviceStatus: any;
  statusId: any;
  tableResponse: any | undefined;
  tableData: any[] | undefined = [];
  pageSize: number | undefined = 5;
  page: number | undefined = 1;
  pageIndex: number = 0;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _DevicesService: DevicesService,
    private _ToastrService: ToastrService,
    private _Router: Router, public dialog: MatDialog
  ) {
    this.deviceId = this._activateRoute.snapshot.paramMap.get('id')
    if (this.deviceId) {
      this.isUpdatePage = true;

    } else {
      this.isUpdatePage = false;
    }
  }

  ngOnInit() {
    this.getDeviceById(this.deviceId)
    this.getDepartment();
    this.getDeviceModel();
    this.getDeviceManufacturers();
    this.getDeviceTypes();
    this.getCustodians();
    this.getDeviceStatus();
  }

  deviceForm = new FormGroup(
    {
      name_en: new FormControl(null, [Validators.required]),
      name_ar: new FormControl(null, [Validators.required]),
      description_en: new FormControl(null, [Validators.required]),
      description_ar: new FormControl(null, [Validators.required]),
      department_id: new FormControl(null, [Validators.required]),
      serial_number: new FormControl(null, [Validators.required]),
      buy_date: new FormControl(null, [Validators.required]),
      type_id: new FormControl(null, [Validators.required]),
      company_id: new FormControl(null, [Validators.required]),
      warranty_period: new FormControl(null, [Validators.required]),
      model_code: new FormControl(null, [Validators.required]),
      model_id: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
    }
  );

  onSubmit(data: FormGroup) {
    if (this.deviceId) {
      // Edit Device
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }

      this._DevicesService.onEditDevice(data.value, this.deviceId).subscribe({
        next: (res) => {
          console.log(data.value)
          this._ToastrService.success('Device Updated Succesfuly');
        },
        error: (err) => {
          this._ToastrService.error(err.message, 'Error in Update Device');
        },
        complete: () => {
          this._Router.navigate(['/dashboard/admin/devices']);
        }
      })

    } else {

      // Add new Device
      let myData = new FormData();
      let myMap = new Map(Object.entries(data.value));
      for (const [key, value] of myMap) {
        myData.append(key, data.value[key]);
      }
      myData.append('buy_date', data.value.buy_date.toISOString().slice(0, 10));

      this._DevicesService.addNewDevice(myData).subscribe({
        next: (res) => {
          // this.data = res
          // console.log(res.message)
          this._ToastrService.success('Device Added Succesfuly');
          this.openConfirm();
        },
        error: (err) => {
          this._ToastrService.error(
            err.message,
            'Error in Add  Device'
          );
        },
        complete: () => {
          this._Router.navigate(['/dashboard/admin/devices']);
        }
      })
    }
  }

  getDeviceById(id: number) {
    this._DevicesService.getDevice(id).subscribe(
      (res) => {
        this.currentDevice = res.data;
        // console.log(this.currentDevice)

        this.deviceForm.patchValue({
          name_en: this.currentDevice?.name,
          name_ar: this.currentDevice?.name,
          description_en: this.currentDevice?.description,
          description_ar: this.currentDevice?.description,
          department_id: this.currentDevice?.department_id,
          serial_number: this.currentDevice?.serial_number,
          buy_date: this.currentDevice?.buy_date,
          type_id: this.currentDevice?.type_id,
          company_id: this.currentDevice?.company_id,
          warranty_period: this.currentDevice?.warranty_period,
          model_code: this.currentDevice?.model_code,
          model_id: this.currentDevice?.model_id,
          status: this.currentDevice?.status,
        })

      }
    )
  }

  // Confirm
  openConfirm() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '40%'
    });
  }

  getDepartment() {
    this._DevicesService.onGetDepartment().subscribe(
      (res) => {
        this.departments = res.data;
      }
    )
  }
  getDeviceModel() {
    this._DevicesService.onGetDeviceModel().subscribe({
      next: (res) => {
        this.devicesModel = res.data;
      }
    });
  }
  getDeviceManufacturers() {
    this._DevicesService.onGetDeviceManufacturers().subscribe({
      next: (res) => {
        this.manufacturers = res.data;
      }
    });
  }
  getDeviceTypes() {
    this._DevicesService.onGetDeviceType().subscribe({
      next: (res) => {
        this.deviceTypes = res.data;
      }
    });
  }
  getCustodians() {
    this._DevicesService.onGetCustodians().subscribe({
      next: (res) => {
        this.custodiansList = res.data;
        console.log(this.custodiansList);
        
      }
    });
  }
  getDeviceStatus() {
    this._DevicesService.onGetDeviceStatus().subscribe({
      next: (res) => {
        this.deviceStatus = res.data;
      }
    });
  }


}
