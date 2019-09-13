import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeUsersComponent } from './employee-users/employee-users.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { UserDetailsComponent } from './user-details/user-details.component';
import { StatusUpdateComponent } from './status-update/status-update.component';

@NgModule({
  declarations: [EmployeeUsersComponent, UserDetailsComponent, StatusUpdateComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class EmployeeUsersModule { }
