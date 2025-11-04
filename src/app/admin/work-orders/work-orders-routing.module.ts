import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { ViewComponent } from './components/view/view.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'work-orders', component: AllComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'add', component: AddComponent },
  // {path:'edit-order/:id' , component:EditOrderComponent},
  { path: 'edit/:id', component: EditComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersRoutingModule { }
