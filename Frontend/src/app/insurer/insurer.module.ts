import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsurerListComponent } from './insurer-list/insurer-list.component';
import { AddOrEditInsurerComponent } from './add-or-edit-insurer/add-or-edit-insurer.component';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import { PackagesComponent } from './packages/packages.component';
import { AddOrEditPackageComponent } from './add-or-edit-package/add-or-edit-package.component';

@NgModule({
  declarations: [InsurerListComponent, AddOrEditInsurerComponent, PackagesComponent, AddOrEditPackageComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule
  ]
})
export class InsurerModule { }
