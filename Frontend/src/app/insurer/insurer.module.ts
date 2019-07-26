import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurerListComponent } from './insurer-list/insurer-list.component';
import { AddOrEditInsurerComponent } from './add-or-edit-insurer/add-or-edit-insurer.component';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [InsurerListComponent, AddOrEditInsurerComponent],
  imports: [
    CommonModule,
    MatTabsModule
  ]
})
export class InsurerModule { }
