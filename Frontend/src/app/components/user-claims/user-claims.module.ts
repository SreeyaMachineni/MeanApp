import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrEditUserClaimsComponent } from './add-or-edit-user-claims/add-or-edit-user-claims.component';
import { UserClaimsListComponent } from './user-claims-list/user-claims-list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import {ContactModule} from '../contact/contact.module';
import {ContactComponent} from '../contact/contact/contact.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AddOrEditUserClaimsComponent, UserClaimsListComponent, ClaimDetailsComponent,ContactComponent ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule,
    FormsModule,ReactiveFormsModule,
    MatInputModule,
    ContactModule,
    MatRadioModule,
    MatSnackBarModule
  ]
})
export class UserClaimsModule { }
