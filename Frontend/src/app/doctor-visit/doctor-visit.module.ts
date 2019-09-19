import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorVisitComponent } from './doctor-visit/doctor-visit.component';
import { AddOrEditDoctorVisitComponent } from './add-or-edit-doctor-visit/add-or-edit-doctor-visit.component';



@NgModule({
  declarations: [DoctorVisitComponent, AddOrEditDoctorVisitComponent],
  imports: [
    CommonModule
  ]
})
export class DoctorVisitModule { }
