import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllDevicesComponent } from './components/all-devices/all-devices.component';
import { AddEditDeviceComponent } from './components/add-edit-device/add-edit-device.component';
import { ViewDeviceComponent } from './components/view-device/view-device.component';
import { AddComponent } from '../work-orders/components/add/add.component';

const routes: Routes = [
  {path:'',component:AllDevicesComponent},
  {path:'devices',component:AllDevicesComponent},
  {path:'add-device',component:AddEditDeviceComponent},
  {path:'add-device/:id',component:AddEditDeviceComponent},
  {path:'view-device/:deviceId',component:ViewDeviceComponent},
  {path:'view-device/:deviceId/add-work-order',component:AddComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevicesRoutingModule { }
