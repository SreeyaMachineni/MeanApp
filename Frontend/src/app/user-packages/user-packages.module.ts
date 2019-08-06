import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditUserPackagesComponent } from './add-or-edit-user-packages/add-or-edit-user-packages.component';
import { UserPackagesListComponent } from './user-packages-list/user-packages-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ViewUserPackageComponent } from './view-user-package/view-user-package.component';
@NgModule({
  declarations: [AddOrEditUserPackagesComponent, UserPackagesListComponent, ViewUserPackageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class UserPackagesModule { }
