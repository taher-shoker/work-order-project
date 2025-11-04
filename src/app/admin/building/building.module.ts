import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingRoutingModule } from './building-routing.module';
import { AddBuildingComponent } from './components/add-building/add-building.component';
import { EditBuildingComponent } from './components/edit-building/edit-building.component';
import { BuildingComponent } from './components/building/building.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddBuildingComponent,
    EditBuildingComponent,
    BuildingComponent
  ],
  imports: [
    CommonModule,
    BuildingRoutingModule,
    SharedModule
  ]
})
export class BuildingModule { }
