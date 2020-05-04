import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorVisitComponent } from './doctor-visit/doctor-visit.component';
import { AddOrEditDoctorVisitComponent } from './add-or-edit-doctor-visit/add-or-edit-doctor-visit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [DoctorVisitComponent, AddOrEditDoctorVisitComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule
  ]
})
export class DoctorVisitModule { }
