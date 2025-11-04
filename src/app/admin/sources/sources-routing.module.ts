import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourcesComponent } from './components/sources/sources.component';

const routes: Routes = [
  {path:'',component:SourcesComponent},
  {path:'sources',component:SourcesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SourcesRoutingModule { }
