import { Component, OnInit } from '@angular/core';
import { DeviceTypeService } from './service/device-type.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddDeviceTypeComponent } from './components/add-device-type/add-device-type.component';
import { FormGroup } from '@angular/forms';
import { EditDeviceTypeComponent } from './components/edit-device-type/edit-device-type.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-device-type',
  templateUrl: './device-type.component.html',
  styleUrls: ['./device-type.component.scss']
})
export class DeviceTypeComponent implements OnInit {

  currentLang = localStorage.getItem('lang');

  deviceTypes: any[] = [];
  deviceTypesId: any;
  selectedType: string | null = null;

  constructor(private deviceTypeService: DeviceTypeService,
    private toastrService: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.allDeviceTypes();
  }

  allDeviceTypes(): void {
    this.deviceTypeService.getAllDeviceType().subscribe({
      next: (res) => {
        this.deviceTypes = res.data;
      }
    })
  }

  // add device Type
  openAddDeviceType() {
    const dialogRef = this.dialog.open(AddDeviceTypeComponent, {
      width: '40%',
      data: this.deviceTypes
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDeviceType(result)
      }
    });
  }

  addDeviceType(data: FormGroup) {
    this.deviceTypeService.addDeviceType(data.value).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Device Type Added Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Added Device Type');
      },
      complete: () => {
        this.allDeviceTypes()
      }
    })
  }

  // edit device Type
  openEditDeviceType(id: any) {
    const dialogRef = this.dialog.open(EditDeviceTypeComponent, {
      width: '40%',
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editDeviceType(result, id)
      }
    });
  }

  editDeviceType(data: FormGroup, id: string) {
    this.deviceTypeService.updateDeviceType(data.value, id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Device Type Update Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Update Device Type');
      },
      complete: () => {
        this.allDeviceTypes()
      }
    })
  }

  //  delete device Type
  openDeleteDeviceType(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteType(result.id)
      }
    });
  }
  deleteType(id: any) {
    this.deviceTypeService.deleteDeviceType(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.allDeviceTypes();
      },
      error: (err) => {
        this.toastrService.error(err.error.message)
      }
    })
  }


}
