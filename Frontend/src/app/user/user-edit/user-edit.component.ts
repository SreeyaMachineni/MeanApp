import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Location } from '@angular/common';
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
  constructor(private authService:AuthService,private router: Router,private location: Location,) { }
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
  saveit(){
    console.log('savit');
    this.user.firstName = this.userEditForm.value.firstName;
    this.user.lastName = this.userEditForm.value.lastName;
    this.user.email = this.userEditForm.value.email;
   // this.user.phone = this.userEditForm.value.phone;
    this.user.gender = this.userEditForm.value.gender;
    this.user.address = this.userEditForm.value.address;
    this.user.dob = this.userEditForm.value.dob;
    console.log(this.user);
    if(this.user.phone != this.userEditForm.value.phone){
      console.log('here');
      this.user.phone = this.userEditForm.value.phone;
      this.authService.sendOtp(this.user).subscribe(
        (data)=>{
          this.verify = true;
          
        },
        (err)=>{console.log('unable to verify')}
      )
    }
  }

  cancel(){
    this.location.back();
  }
  verifyUser(){
    this.authService.editUser(this.user,this.otpForm.value.otp).subscribe(
      (data)=>{
        if(data['success']){
          this.router.navigate(['/profile']);
        }
        else{
          console.log('err in editing user');
        }
      },
      (err)=>console.log(err)
    );
  }

}
