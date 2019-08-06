import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditUserClaimsComponent } from './add-or-edit-user-claims/add-or-edit-user-claims.component';
import { UserClaimsListComponent } from './user-claims-list/user-claims-list.component';



@NgModule({
  declarations: [AddOrEditUserClaimsComponent, UserClaimsListComponent],
  imports: [
    CommonModule
  ]
})
export class UserClaimsModule { }
