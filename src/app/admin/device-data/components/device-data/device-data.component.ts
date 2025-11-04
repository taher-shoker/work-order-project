import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DevicesService } from 'src/app/admin/devices/services/devices.service';

@Component({
  selector: 'app-device-data',
  templateUrl: './device-data.component.html',
  styleUrls: ['./device-data.component.scss']
})
export class DeviceDataComponent implements OnInit {

  deviceData!: FormGroup;

  constructor(public translate: TranslateService, private devicesService: DevicesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.deviceData = this.fb.group({
      
    })
  }


}
