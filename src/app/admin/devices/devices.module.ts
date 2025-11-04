import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { DevicesRoutingModule } from './devices-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditDeviceComponent } from './components/add-edit-device/add-edit-device.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { AllDevicesComponent } from './components/all-devices/all-devices.component';
import { A11yModule } from "@angular/cdk/a11y";

@NgModule({
  declarations: [
    AddEditDeviceComponent,
    ViewDeviceComponent,
    AllDevicesComponent
  ],
  imports: [
    CommonModule,
    DevicesRoutingModule,
    SharedModule,
    A11yModule,
    DatePipe
]
})
export class DevicesModule { }
