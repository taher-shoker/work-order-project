import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeviceDataRoutingModule } from './device-data-routing.module';
import { DeviceDataComponent } from './components/device-data/device-data.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManufacturersComponent } from './components/manufacturers/manufacturers.component';
import { AddCompanyComponent } from './components/manufacturers/components/add-company/add-company.component';
import { EditCompanyComponent } from './components/manufacturers/components/edit-company/edit-company.component';
import { DeviceModelComponent } from './components/device-model/device-model.component';
import { AddDeviceModelComponent } from './components/device-model/components/add-device-model/add-device-model.component';
import { EditDeviceModelComponent } from './components/device-model/components/edit-device-model/edit-device-model.component';
import { DeviceTypeComponent } from './components/device-type/device-type.component';
import { AddDeviceTypeComponent } from './components/device-type/components/add-device-type/add-device-type.component';
import { EditDeviceTypeComponent } from './components/device-type/components/edit-device-type/edit-device-type.component';


@NgModule({
  declarations: [
    DeviceDataComponent,
    ManufacturersComponent,
    AddCompanyComponent,
    EditCompanyComponent,
    DeviceModelComponent,
    AddDeviceModelComponent,
    EditDeviceModelComponent,
    DeviceTypeComponent,
    AddDeviceTypeComponent,
    EditDeviceTypeComponent,
  ],
  imports: [
    CommonModule,
    DeviceDataRoutingModule,
    SharedModule
  ]
})
export class DeviceDataModule { }
