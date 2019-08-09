import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignUsersComponent } from './assign-users/assign-users.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AssignUsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AssignUsersModule { }
