import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const url: any = localStorage.getItem('attemptedUrl');

const routes: Routes = [
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
  },

  {
    path: 'users',
    loadChildren: () =>
      import('./admin-users/admin-users.module').then(
        (m) => m.AdminUsersModule
      ),
  },
  {
    path: 'departments',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'building',
    loadChildren: () =>
      import('./building/building.module').then((m) => m.BuildingModule),
  },
  {
    path: 'sources',
    loadChildren: () =>
      import('./sources/sources.module').then((m) => m.SourcesModule),
  },
  {
    path: 'equipments',
    loadChildren: () =>
      import('./equipments/equipments.module').then((m) => m.EquipmentsModule),
  },
  {
    path: 'work-orders',
    loadChildren: () =>
      import('./work-orders/work-orders.module').then(
        (m) => m.WorkOrdersModule
      ),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsModule),
  },
  {
    path: 'devices',
    loadChildren: () =>
      import('./devices/devices.module').then((m) => m.DevicesModule),
  },
  {
    path: 'device-data',
    loadChildren: () =>
      import('./device-data/device-data.module').then(
        (m) => m.DeviceDataModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
