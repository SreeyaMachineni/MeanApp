import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { ToastrModule } from 'ngx-toastr';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatNativeDateModule, MatToolbarModule, MatSidenav, MatSidenavModule, MatGridListModule, MatTooltipModule, MatDividerModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MatBadgeModule } from '@angular/material/badge';
import { FileSelectDirective } from 'ng2-file-upload';
import { AuthGuard } from './guards/auth.guard';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddOrEditEmployeeComponent } from './components/add-or-edit-employee/add-or-edit-employee.component';
import { HospitalsComponent } from './components/hospitals/hospitals.component';
import { AddOrEditHospitalsComponent } from './components/add-or-edit-hospitals/add-or-edit-hospitals.component';
import { CategoryModule } from './components/category/category.module';
import { DoctorVisitModule } from './components/doctor-visit/doctor-visit.module';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { InsurerModule } from './components/insurer/insurer.module';
import { UserClaimsModule } from './components/user-claims/user-claims.module';
import { UserPackagesModule } from './components/user-packages/user-packages.module';
import { InsurerListComponent } from './components/insurer/insurer-list/insurer-list.component';
import { AddOrEditInsurerComponent } from './components/insurer/add-or-edit-insurer/add-or-edit-insurer.component';
import { AddOrEditPackageComponent } from './components/insurer/add-or-edit-package/add-or-edit-package.component';
import { AssignUsersComponent } from './components/assign-users/assign-users/assign-users.component';
import { EmployeeUsersComponent } from './components/employee-users/employee-users/employee-users.component';
import { UserDetailsComponent } from './components/employee-users/user-details/user-details.component';
import { PackagesComponent } from './components/insurer/packages/packages.component';
import { MatTabsModule } from '@angular/material/tabs';
import { UserClaimsListComponent } from './components/user-claims/user-claims-list/user-claims-list.component';
import { AddOrEditUserClaimsComponent } from './components/user-claims/add-or-edit-user-claims/add-or-edit-user-claims.component';
import { UserModule } from './components/user/user.module';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HospitalsModule } from './components/hospitals/hospitals.module';
import { HospitalPoCListComponent } from './components/hospitals/hospital-po-clist/hospital-po-clist.component';
import { AddOrEditHospitalPoCComponent } from './components/hospitals/add-or-edit-hospital-po-c/add-or-edit-hospital-po-c.component';
import { HospitalDetailsComponent } from './components/hospitals/hospital-details/hospital-details.component';
import { StatusCodeDirective } from './status-code.directive';
import { DoctorVisitComponent } from './components/doctor-visit/doctor-visit/doctor-visit.component';
import { AddOrEditDoctorVisitComponent } from './components/doctor-visit/add-or-edit-doctor-visit/add-or-edit-doctor-visit.component';
import { ContactModule } from './components/contact/contact.module';
import { ContactComponent } from './components/contact/contact/contact.component';
import { ClaimDetailsComponent } from './components/user-claims/claim-details/claim-details.component';
import { MatRadioModule } from '@angular/material/radio';
import { ContactHistoryComponent } from './components/contact/contact-history/contact-history.component';
import { NotificationDirective } from './notification.directive';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { UserPackagesListComponent } from './components/user-packages/user-packages-list/user-packages-list.component';
import { AddOrEditUserPackagesComponent } from './components/user-packages/add-or-edit-user-packages/add-or-edit-user-packages.component';
import { ViewUserPackageComponent } from './components/user-packages/view-user-package/view-user-package.component';

const appRoutes: Routes = [
  // {path:'',component:LoginComponent},
  { path: 'register', component: RegisterComponent },
  // {path:'login',component:LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'employees', component: EmployeeComponent },
      { path: 'addOrEditEmp', component: AddOrEditEmployeeComponent, pathMatch: 'full' },
      { path: 'hospitals', component: HospitalsComponent },
      { path: 'addOrEditHospital', component: AddOrEditHospitalsComponent },
      { path: 'insCategories', component: CategoryListComponent ,},
      { path: 'insurers', component: InsurerListComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'addOrEditInsurer', component: AddOrEditInsurerComponent, pathMatch: 'full' },
      { path: 'addOrEditPackage', component: AddOrEditPackageComponent },
      { path: 'mypackages', component: UserPackagesListComponent },
      { path: 'myclaims', component: UserClaimsListComponent },
      { path: 'addOrEditUserPackage', component: AddOrEditUserPackagesComponent },
      { path: 'viewUserPackage', component: ViewUserPackageComponent },
      { path: 'assignUsers', component: AssignUsersComponent },
      { path: 'myUsers', component: EmployeeUsersComponent },
      { path: 'userDetails', component: UserDetailsComponent },
      { path: 'addUserClaim', component: AddOrEditUserClaimsComponent },
      { path: 'editUser', component: UserEditComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'hospitalPoc', component: HospitalPoCListComponent },
      { path: 'addOrEditHospitalPoc', component: AddOrEditHospitalPoCComponent },
      { path: 'hospitalDetails', component: HospitalDetailsComponent },
      { path: 'doctorVisit', component: DoctorVisitComponent },
      { path: 'addOrEditDoctorVisit', component: AddOrEditDoctorVisitComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'claimDetails', component: ClaimDetailsComponent }
    ]
  },
  { path: 'verify', component: VerifyUserComponent },

]

@NgModule({
  declarations: [
    AppComponent,
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
    DashboardComponent,
    StatusCodeDirective,
    NotificationDirective
  ],
  
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDividerModule,
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
    UserModule,
    HospitalsModule,
    DoctorVisitModule,
    ContactModule,
    MatRadioModule,
    MatGridListModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTooltipModule

  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }
