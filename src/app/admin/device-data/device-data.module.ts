import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceDataRoutingModule } from './device-data-routing.module';
import { DeviceDataComponent } from './components/device-data/device-data.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeviceDataComponent
  ],
  imports: [
    CommonModule,
    DeviceDataRoutingModule,
    SharedModule
  ]
})
export class DeviceDataModule { }
