import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../user';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-or-edit-employee',
  templateUrl: './add-or-edit-employee.component.html',
  styleUrls: ['./add-or-edit-employee.component.css']
})
export class AddOrEditEmployeeComponent implements OnInit {

  emp:User;
  action:String;
  employeeForm:FormGroup;
  empIdToEdit:any;
  gender:any;
  constructor(private authService:AuthService,private router: Router,private location: Location,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.emp = new User();
    this.gender = '';
    this.action = this.authService.getAction();
    if(this.action == 'edit'){
      this.emp = this.authService.getUser();
     // this.gender = this.emp.gender;
      this.employeeForm = new FormGroup(
        {
          firstName: new FormControl(this.emp.firstName),
          lastName: new FormControl(this.emp.lastName),
          email: new FormControl(this.emp.email),
          phone: new FormControl(this.emp.phone),
          gender:new FormControl(this.emp.gender),
          address:new FormControl(this.emp.address),
          dob:new FormControl(this.emp.dob),
          passport:new FormControl(this.emp.passport),
          pan:new FormControl(this.emp.pan),
          qualification:new FormControl(this.emp.qualification),
          maritalStatus:new FormControl(this.emp.maritalStatus)
        }
      );

    }else{
      this.employeeForm = new FormGroup(
        {
          firstName: new FormControl(''),
          lastName: new FormControl(''),
          email: new FormControl(''),
          phone: new FormControl(''),
          gender:new FormControl(''),
          address:new FormControl(''),
          dob:new FormControl(''),
          passport:new FormControl(''),
          pan:new FormControl(''),
          qualification:new FormControl(''),
          maritalStatus:new FormControl('')
        }
      );
    }
  
  }

  

  saveit(empId){
     this.emp.firstName = this.employeeForm.value.firstName;
   this.emp.lastName = this.employeeForm.value.lastName;
   this.emp.email = this.employeeForm.value.email;
   this.emp.phone = this.employeeForm.value.phone;
   this.emp.gender = this.employeeForm.value.gender;
   this.emp.address = this.employeeForm.value.address;
   this.emp.dob = this.employeeForm.value.dob;
   this.emp.pan = this.employeeForm.value.pan;
   this.emp.passport = this.employeeForm.value.passport;
   this.emp.maritalStatus = this.employeeForm.value.maritalStatus;
   this.emp.qualification = this.employeeForm.value.qualification;
    this.emp.userrole='employee';
    if(this.action == 'add'){
      this.emp.password = 'light';

  this.authService.addEmp(this.emp).subscribe(
    (data)=>{
      if(data['success']){
        this.router.navigate(['/home/employees']);
        this._snackBar.open('Employee successfully Added', 'x', {
          duration: 3000
        });
      }
    },
      err=>console.log('err in adding employee')
  )
    }
    else{
      this.authService.editEmp(this.emp,empId).subscribe(
        (data)=>{
          if(data['success']){
            this.router.navigate(['/home/employees']);
            this._snackBar.open('Employee successfully edited', 'x', {
              duration: 3000
            });
          }
        },
        err=>console.log('err in editing employee')
      );
    }

 }
 
 cancel(){
  this.location.back();
}
}
