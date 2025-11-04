import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SourcesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './components/sources/sources.component';
import { AddSourceComponent } from './components/add-source/add-source.component';
import { EditSourceComponent } from './components/edit-source/edit-source.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SourcesComponent,
    AddSourceComponent,
    EditSourceComponent
  ],
  imports: [
    CommonModule,
    SourcesRoutingModule,
    SharedModule
  ]
})
export class SourcesModule { }
