import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,  Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
import { AuthService } from '../../auth.service';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signedUpUser:User;
  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.signedUpUser = new User();
  }
  userProfileForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(''),
      phone: new FormControl(''),
      gender:new FormControl(''),
      address:new FormControl(''),
      dob:new FormControl('')
    }
  );


  saveit(){
      this.signedUpUser.firstName = this.userProfileForm.value.firstName;
    this.signedUpUser.lastName = this.userProfileForm.value.lastName;
    this.signedUpUser.email = this.userProfileForm.value.email;
    this.signedUpUser.password = this.userProfileForm.value.password;
    this.signedUpUser.phone = this.userProfileForm.value.phone;
    this.signedUpUser.gender = this.userProfileForm.value.gender;
    this.signedUpUser.address = this.userProfileForm.value.address;
    this.signedUpUser.dob = this.userProfileForm.value.dob
    this.signedUpUser.userrole = 'user';
    // change it when editing the user values
    this.signedUpUser.isAssigned=false;
    this.signedUpUser.assignedTo = null;  
    // change it when editing the user values
    this.authService.sendOtp(this.signedUpUser).subscribe(
      (data)=>{
        this.router.navigate(['/verify']);
      },
      err=>console.log('err in verification')
    )
  }


}
