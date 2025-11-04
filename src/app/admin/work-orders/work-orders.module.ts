import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';
import { AllComponent } from './components/all/all.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    ViewComponent,
    AllComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    SharedModule
  ]
})
export class WorkOrdersModule { }
