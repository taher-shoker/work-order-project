import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeviceModelService } from './service/device-model.service';
import { AddDeviceModelComponent } from './components/add-device-model/add-device-model.component';
import { FormGroup } from '@angular/forms';
import { EditDeviceModelComponent } from './components/edit-device-model/edit-device-model.component';
import { DeleteItemComponent } from 'src/app/shared/delete-item/delete-item.component';

@Component({
  selector: 'app-device-model',
  templateUrl: './device-model.component.html',
  styleUrls: ['./device-model.component.scss']
})
export class DeviceModelComponent implements OnInit {

  currentLang = localStorage.getItem('lang');

  deviceModels: any[] = [];
  deviceModelsId: any;
  selectedModel: string | null = null;

  constructor(private deviceModelService: DeviceModelService,
    private toastrService: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.allDeviceModels();
  }

  allDeviceModels(): void {
    this.deviceModelService.getAllDeviceModel().subscribe({
      next: (res) => {
        this.deviceModels = res.data;
      }
    })
  }

  // add device model
  openAddDeviceModel() {
    const dialogRef = this.dialog.open(AddDeviceModelComponent, {
      width: '40%',
      data: this.deviceModels
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.addDeviceModels(result)
      }
    });
  }

  addDeviceModels(data: FormGroup) {
    this.deviceModelService.addDeviceModel(data.value).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Model Added Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Added Model');
      },
      complete: () => {
        this.allDeviceModels()
      }
    })
  }

  // edit device model
  openEditDeviceModel(id: any) {
    const dialogRef = this.dialog.open(EditDeviceModelComponent, {
      width: '40%',
      data: id
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editDeviceModel(result, id)
      }
    });
  }

  editDeviceModel(data: FormGroup, id: string) {
    this.deviceModelService.updateDeviceModel(data.value, id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Model Update Succesfuly');
      },
      error: (err) => {
        this.toastrService.error(err.message, 'Error in Update Model');
      },
      complete: () => {
        this.allDeviceModels()
      }
    })
  }

  //  delete device model
  openDeleteManufacturer(data: any): void {
    const dialogRef = this.dialog.open(DeleteItemComponent, {
      data: data,
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteModel(result.id)
      }
    });
  }
  deleteModel(id: any) {
    this.deviceModelService.deleteDeviceModel(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message);
        this.allDeviceModels();
      },
      error: (err) => {
        this.toastrService.error(err.error.message)
      }
    })
  }

}
