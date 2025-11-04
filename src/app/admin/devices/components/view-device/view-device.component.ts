import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DevicesService } from '../../services/devices.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.component.html',
  styleUrls: ['./view-device.component.scss'],
})
export class ViewDeviceComponent {
  currentLang = localStorage.getItem('lang');
  deviceData: any;
  deviceWork: any;
  deviceId:any;

  constructor(
    private _devicesService: DevicesService,
    private _ToastrService: ToastrService,
    private _activatedRoute:ActivatedRoute
  ) {
    this.deviceId = _activatedRoute.snapshot.params['deviceId'];
    console.log(this.deviceId);
    
  }

  ngOnInit(): void {
    this.getDeviceById(this.deviceId);
    this.getDeviceWorkOrder(this.deviceId);
  }
  getDeviceById(id: number) {
    this._devicesService.getDevice(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Get device Succesfuly');
        this.deviceData = res.data;
        console.log(this.deviceData);
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Fetch device');
      }
    });
  }

  getDeviceWorkOrder(id: number) {
    this._devicesService.getDeviceWorkOrder(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Get device Succesfuly');
        this.deviceWork = res.data;
        console.log(this.deviceWork);
      },
      error: (err) => {
        this._ToastrService.error(err.message, 'Error in Fetch device');
      },
      complete: () => {},
    });
  }


}
