import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalPoCListComponent } from './hospital-po-clist/hospital-po-clist.component';
import { AddOrEditHospitalPoCComponent } from './add-or-edit-hospital-po-c/add-or-edit-hospital-po-c.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { HospitalDetailsComponent } from './hospital-details/hospital-details.component';
@NgModule({
  declarations: [HospitalPoCListComponent, AddOrEditHospitalPoCComponent, HospitalDetailsComponent],
  imports: [
    CommonModule,
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
export class HospitalsModule { }
