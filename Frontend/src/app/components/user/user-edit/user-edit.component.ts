import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/user';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent implements OnInit {
  user:User;
  userEditForm:FormGroup;
  otpForm:FormGroup;
  verify = false;

  constructor(private authService:AuthService,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.userEditForm=new FormGroup({
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      email: new FormControl(this.user.email),
      phone: new FormControl(this.user.phone),
      gender:new FormControl(this.user.gender),
      address:new FormControl(this.user.address),
      dob:new FormControl(this.user.dob)
    });
    this.otpForm = new FormGroup({
      otp: new FormControl(''),
    });
  }

  saveit(){    this.user.firstName = this.userEditForm.value.firstName;
    this.user.lastName = this.userEditForm.value.lastName;
    this.user.email = this.userEditForm.value.email;
   // this.user.phone = this.userEditForm.value.phone;
    this.user.gender = this.userEditForm.value.gender;
    this.user.address = this.userEditForm.value.address;
    this.user.dob = this.userEditForm.value.dob;
    if(this.user.phone != this.userEditForm.value.phone){
      this.user.phone = this.userEditForm.value.phone;
      this.authService.sendOtp(this.user).subscribe(
        (data)=>{
          this.verify = true;
          this._snackBar.open('User verified successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
        },
        (err)=>this._snackBar.open('Error while verifying User', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
      )
    }else{
      this.user.phone = this.userEditForm.value.phone;
      this.authService.editUserSamePhone(this.user).subscribe(
        (data)=>{
          this.router.navigate(['/profile']);
          this._snackBar.open('User details updated successfully', 'x', { duration: 3000,panelClass: ['snack-success'] })
        },
        (err)=>{
          this._snackBar.open('Error while updating User', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      )
    }
  }

  cancel(){
    this.location.back();
  }

  verifyUser(){
    this.authService.editUser(this.user,this.otpForm.value.otp).subscribe(
      (data)=>{
        this.router.navigate(['/profile']);
        if(data['success']){


          
          this.router.navigate(['/profile']);
        }
        else{
          this._snackBar.open('Error while verifying User', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
        }
      },
      (err)=>this._snackBar.open('Error while verifying User', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
    );
  }


}
