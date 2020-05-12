import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../user';
import { AuthService } from '../../auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  signedUpUser: User;
  currentHours: any;
  greeting: any;
  currentDate:any;

  constructor(private authService: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.signedUpUser = new User();
    this.currentDate = new Date().toISOString();
    this.currentHours = new Date().getHours();
    if (this.currentHours < 12) {
      this.greeting = 'GOOD MORNING';
    }
    else if (this.currentHours < 16) {
      this.greeting = 'GOOD AFTERNOON';
    }
    else {
      this.greeting = 'GOOD EVENING';
    }
  }

  userProfileForm = new FormGroup(
    {
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      dob: new FormControl('')
    }
  );

  saveit() {
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
    this.signedUpUser.isAssigned = false;
    this.signedUpUser.assignedTo = null;
    // change it when editing the user values
    
    this.authService.sendOtp(this.signedUpUser).subscribe(
      (data) => {
        this._snackBar.open('OTP verified successfully', 'x', { duration: 3000, panelClass: ['snackbar-success'] })
        this.router.navigate(['/verify']);
      },
      err => this._snackBar.open('Error while verifying OTP', 'x', { duration: 3000, panelClass: ['snackbar-error'] })
    )
  }

}
