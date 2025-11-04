import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentsComponent } from './components/equipments/equipments.component';

const routes: Routes = [
  { path: '', component: EquipmentsComponent },
  { path: 'equipments', component: EquipmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentsRoutingModule { }
