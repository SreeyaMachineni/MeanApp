import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit/user-edit.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [UserEditComponent],
  imports: [
    CommonModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule,
    MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule,
    MatDatepickerModule,MatFormFieldModule,MatSelectModule
  ]
})
export class UserModule { }
