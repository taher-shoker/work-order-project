import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [

  {
    path: '', component: DashboardComponent, children: [

      {
        path: "admin",
        // canActivate: [AdminGuard],
        loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: "engineer",
        // canActivate: [EngineerGuard],
        loadChildren: () => import('../engineer/engineer.module').then(m => m.EngineerModule)
      },
      {
        path: "technicians",
        // canActivate: [TechnicianGuard],
        loadChildren: () => import('../technicians/technicians.module').then(m => m.TechniciansModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
