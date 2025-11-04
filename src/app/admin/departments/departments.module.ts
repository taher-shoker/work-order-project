import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentsRoutingModule } from './departments-routing.module';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { EditDepartmentComponent } from './components/edit-department/edit-department.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { MaterialModule } from "src/app/shared/material/material/material.module";
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddDepartmentComponent,
    EditDepartmentComponent,
    DepartmentsComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule
]
})
export class DepartmentsModule { }
