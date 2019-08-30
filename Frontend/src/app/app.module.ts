import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import {ToastrModule} from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule,MatNativeDateModule } from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import {MatBadgeModule} from '@angular/material/badge';
import { FileSelectDirective } from 'ng2-file-upload';
import {AuthGuard} from './guards/auth.guard';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddOrEditEmployeeComponent } from './components/add-or-edit-employee/add-or-edit-employee.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { AddOrEditHospitalsComponent } from './components/add-or-edit-hospitals/add-or-edit-hospitals.component';
import {CategoryModule} from './category/category.module';
import { CategoryListComponent } from './category/category-list/category-list.component';
import {InsurerModule} from './insurer/insurer.module';
import {UserClaimsModule} from './user-claims/user-claims.module';
import {UserPackagesModule} from './user-packages/user-packages.module';
import { InsurerListComponent } from './insurer/insurer-list/insurer-list.component';
import { AddOrEditInsurerComponent } from './insurer/add-or-edit-insurer/add-or-edit-insurer.component';
import { AddOrEditPackageComponent } from './insurer/add-or-edit-package/add-or-edit-package.component';
import { UserPackagesListComponent } from './user-packages/user-packages-list/user-packages-list.component';

import { AddOrEditUserPackagesComponent } from './user-packages/add-or-edit-user-packages/add-or-edit-user-packages.component';
import { ViewUserPackageComponent } from './user-packages/view-user-package/view-user-package.component';
import {AssignUsersComponent} from './assign-users/assign-users/assign-users.component';
import {EmployeeUsersComponent} from './employee-users/employee-users/employee-users.component';
import {UserDetailsComponent} from './employee-users/user-details/user-details.component';
import {PackagesComponent} from './insurer/packages/packages.component';
import {MatTabsModule} from '@angular/material/tabs';
 import { UserClaimsListComponent } from './user-claims/user-claims-list/user-claims-list.component';
 import {AddOrEditUserClaimsComponent} from './user-claims/add-or-edit-user-claims/add-or-edit-user-claims.component';


const appRoutes:Routes = [
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],children:[
    {path:'employees',component:EmployeeComponent},
    {path:'addOrEditEmp',component:AddOrEditEmployeeComponent,pathMatch: 'full'},
    {path:'hospitals',component:HospitalsComponent},
    {path:'addOrEditHospital',component:AddOrEditHospitalsComponent},
    {path:'insCategories',component:CategoryListComponent},
    {path:'insurers',component:InsurerListComponent},
    {path:'packages',component:PackagesComponent},
    {path:'addOrEditInsurer',component:AddOrEditInsurerComponent,pathMatch: 'full'},
    {path:'addOrEditPackage',component:AddOrEditPackageComponent},
    {path:'mypackages',component:UserPackagesListComponent},
    {path:'myclaims',component:UserClaimsListComponent},
    {path:'addOrEditUserPackage',component:AddOrEditUserPackagesComponent},
    {path:'viewUserPackage',component:ViewUserPackageComponent},
    {path:'assignUsers',component:AssignUsersComponent},
    {path:'myUsers',component:EmployeeUsersComponent},
    {path:'userDetails',component:UserDetailsComponent},
    {path:'addUserClaim',component:AddOrEditUserClaimsComponent}
  ]},
  {path:'verify',component:VerifyUserComponent},
  
]


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    VerifyUserComponent,
    EmployeeComponent,
    NavbarComponent,
    AddOrEditEmployeeComponent,
    HospitalsComponent,
    AddOrEditHospitalsComponent,
    AssignUsersComponent,
    FileSelectDirective,
    EmployeeUsersComponent,
    UserDetailsComponent,
  //  AddOrEditUserClaimsComponent
 // UserComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CategoryModule,
    InsurerModule,
    UserClaimsModule,
    UserPackagesModule,
    MatBadgeModule,
    MatTabsModule,
    
    
    
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
