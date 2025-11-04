import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from './components/equipments/equipments.component';
import { AddEquipmentComponent } from './components/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './components/edit-equipment/edit-equipment.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EquipmentsComponent,
    AddEquipmentComponent,
    EditEquipmentComponent
  ],
  imports: [
    CommonModule,
    EquipmentsRoutingModule,
    SharedModule
  ]
})
export class EquipmentsModule { }
